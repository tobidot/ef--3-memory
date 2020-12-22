import {ModelTable} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable";
import {Rect} from "../../../../tools/data/Rect";
import {Vector2, Vector2I} from "../../../../tools/data/Vector2";
import {PhysicRelation} from "../../GamePhysicsModel";
import {ModelCollection} from "../../ModelCollection";
import {ObjectModel} from "../../ObjectModel";

interface ObjectToVectorPrjectionRange {
    min: number,
    max: number,
};

export class PhysicCollisionHelper {
    public static buffer_rect_a: Rect = new Rect();
    public static buffer_rect_b: Rect = new Rect();

    public static get_all_relations(object: ObjectModel, others: ModelTable<ModelCollection, ObjectModel>): WeakMap<ObjectModel, PhysicRelation> {
        let map = new WeakMap;
        others.map((other) => {
            if (other === object) return other;
            map.set(other, PhysicCollisionHelper.get_relation(object, other));
            return other;
        })
        return map;
    }

    public static get_relation(source: ObjectModel, other: ObjectModel): PhysicRelation {
        const position_difference = other.position.cpy().sub(source.position);
        const distance_squared = position_difference.len2();
        const distance = Math.sqrt(distance_squared);
        const overlapping_vector = PhysicCollisionHelper.get_overlaping_vector(source, other, distance_squared);
        return {
            distance,
            distance_squared,
            position_difference,
            overlapping_vector,
        }
    }

    /**
     *
     * @param source The fixed object
     * @param other The other object checking collision against
     * @param distance2 The radial_distance squared between positions that is already calculated
     */
    public static get_overlaping_vector(source: ObjectModel, other: ObjectModel, distance2?: number): null | Vector2 {
        if (distance2 === undefined) distance2 = source.position.cpy().sub(other.position).len2();
        const needed_distance = (source.collision_radius + other.collision_radius);
        const needed_distance2 = needed_distance * needed_distance;
        if (distance2 >= needed_distance2) return null;
        const all_axis = [
            ...PhysicCollisionHelper.get_seperating_axis_from_rotated_rect(source.rotation),
            ...PhysicCollisionHelper.get_seperating_axis_from_rotated_rect(other.rotation),
        ];
        // TODO i need to rotate the box
        const source_box_corners = source.collision_box.get_corners().map(
            (p)=>new Vector2(p).rotate_radians_clockwise(source.rotation).add(source.position)
        );
        const other_box_corners = other.collision_box.get_corners().map(
            (p)=>new Vector2(p).rotate_radians_clockwise(other.rotation).add(other.position)
        );
        const all_overlaping_axis = all_axis.map((axis) => {
            return {
                axis,
                amount: PhysicCollisionHelper.get_overlap_on_seperating_axis(
                    axis,
                    source_box_corners,
                    other_box_corners
                )
            };
        });
        const minimum_overlaping_axis = all_overlaping_axis.reduce((minimum, next) => {
            if (next.amount === null) return next;
            if (minimum.amount === null) return minimum;
            if (Math.abs(next.amount) < Math.abs(minimum.amount)) return next;
            return minimum;
        });
        if (minimum_overlaping_axis.amount === null) return null;
        return minimum_overlaping_axis.axis.set_magnitude(minimum_overlaping_axis.amount);
    }

    public static get_seperating_axis_from_rotated_rect(rotation_radians: number): Vector2[] {
        return [
            Vector2.from_angle(rotation_radians + Math.PI / 2),
            Vector2.from_angle(rotation_radians),
        ];
    }

    /**
     * Calculates the overlap on a given axis.
     * @param axis Axis to project the rectangles on
     * @param source The rect seen as fixed
     * @param other The rect checking the collision with
     * @returns number|null
     *  The amount the other rect needs to move along the axis
     *  to not overlap anymore
     *  null => not overlapping
     */
    public static get_overlap_on_seperating_axis(axis: Vector2, source: Array<Vector2>, other: Array<Vector2>): number | null {
        const source_range = PhysicCollisionHelper.get_projection_range_on_axis_for_rect(axis, source);
        const other_range = PhysicCollisionHelper.get_projection_range_on_axis_for_rect(axis, other);
        if (!source_range || !other_range) throw new Error("Failed projecting rectangles");
        return PhysicCollisionHelper.get_overlap_of_ranges(source_range, other_range);
    }

    public static get_projection_range_on_axis_for_rect(axis: Vector2, rect_corners: Array<Vector2>): ObjectToVectorPrjectionRange | null {
        return rect_corners.reduce<null | ObjectToVectorPrjectionRange>((result: null | ObjectToVectorPrjectionRange, next_point: Vector2I) => {
            const distance_on_axis: number = get_projection_distance_of(axis, next_point);
            if (result === null) {
                return {min: distance_on_axis, max: distance_on_axis};
            }
            return {
                min: Math.min(result.min, distance_on_axis),
                max: Math.max(result.max, distance_on_axis),
            };
        }, null);
    }

    /**
     *
     * ---A--A-B--B--
     * no overlap => null
     *
     * ---A-BA-B---
     * overlap on the right => 1
     *
     * -B-AB-A----
     * overlap on the left => -1
     *
     * ---ABB-A----
     * overlap on the left => -2
     *
     * @returns number
     *  The amount the other Range has to move to not collide anymore
     */
    public static get_overlap_of_ranges(source: ObjectToVectorPrjectionRange, other: ObjectToVectorPrjectionRange): number | null {
        if (source.min >= other.max || source.max <= other.min) return null;
        const overlap_left = other.max - source.min;
        const overlap_right = other.min - source.max;
        if (Math.abs(overlap_left) < Math.abs(overlap_right)) return overlap_left;
        return overlap_right;
    }
}

function get_projection_distance_of(axis: Vector2, projection_source: Vector2I): number {
    return axis.dot(projection_source) / axis.len2();
}