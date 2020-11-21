import { Model } from "../../tools/abstract/mvc/Model";
import { FieldModel } from "./FieldModel";
import { ModelCollection } from "./ModelCollection";


interface Strike {
    type: "X" | "O";
    count: number;
};
export class GameModel extends Model<ModelCollection> {
    width: number = 3;
    height: number = 3;
    fields: Array<FieldModel> = [];
    active_player: "X" | "O" = "X";

    public constructor() {
        super();
        this.reset();
    }

    public update(delta_seconds: number) {
    }

    public reset() {
        this.width = this.height = 3;
        const size = this.width * this.height;
        this.active_player = "X";
        this.fields = [...new Array(size)].map(() => {
            return new FieldModel();
        });
    }

    public active_player_pick_position(x: number, y: number) {
        if (this.can_set(x, y)) {
            this.set(x, y, this.active_player);
        }
    }

    public get_fields_as_string(): string[] {
        return this.fields.map((field) => {
            return field.type;
        });
    }

    public convert_relative_position_to_field_position(x: number, y: number): false | [number, number] {
        const fx = Math.floor(x * this.width);
        const fy = Math.floor(y * this.height);
        if (!this.is_within_bounds(fx, fy)) return false;
        return [fx, fy];

    }

    public can_set(x: number, y: number): boolean {
        const field = this.at(x, y);
        if (!field) return false;
        if (field.type !== " ") return false;
        return true;
    }

    public set(x: number, y: number, type: "X" | "O") {
        const field = this.at(x, y);
        if (!field) return false;
        if (field.type !== " ") return false;
        field.type = type;
        return true;
    }

    protected at(x: number, y: number): FieldModel {
        return this.fields[x + y * this.width];
    }

    public is_game_over(): boolean {
        return this.get_winner() !== false;
    }

    public get_winner(): false | "X" | "O" {
        return [
            this.has_horizontal_strike(),
            this.has_vertical_strike(),
            this.has_diagonal_up_right_strike(),
            this.has_diagonal_down_right_strike()
        ].reduce((winner: false | "X" | "O", next: false | Strike) => {
            if (winner !== false) return winner;
            if (next === false) return false;
            return next.type;
        }, false);
    }

    public has_horizontal_strike(): false | Strike {
        for (let y = 0; y < this.height; y++) {
            const line = this.get_line_of_fields(0, y, 1, 0);
            const strike = this.is_line_a_strike(line);
            if (strike) return strike;
        }
        return false;
    }

    public has_vertical_strike(): false | Strike {
        for (let x = 0; x < this.width; x++) {
            const line = this.get_line_of_fields(x, 0, 0, 1);
            const strike = this.is_line_a_strike(line);
            if (strike) return strike;
        }
        return false;
    }

    public has_diagonal_up_right_strike(): false | Strike {
        for (let y = 0; y < this.height; y++) {
            const line = this.get_line_of_fields(0, y, 1, -1);
            const strike = this.is_line_a_strike(line);
            if (strike) return strike;
        }
        for (let x = 0; x < this.width; x++) {
            const line = this.get_line_of_fields(x, this.height - 1, 1, -1);
            const strike = this.is_line_a_strike(line);
            if (strike) return strike;
        }
        return false;
    }

    public has_diagonal_down_right_strike(): false | Strike {
        for (let x = 0; x < this.width; x++) {
            const line = this.get_line_of_fields(x, 0, 1, 1);
            const strike = this.is_line_a_strike(line);
            if (strike) return strike;
        }
        for (let y = 0; y < this.height; y++) {
            const line = this.get_line_of_fields(0, y, 1, 1);
            const strike = this.is_line_a_strike(line);
            if (strike) return strike;
        }
        return false;
    }

    protected get_line_of_fields(start_x: number, start_y: number, direction_x: number, direction_y: number): Array<FieldModel> {
        let result: Array<FieldModel> = [];
        let x = start_x;
        let y = start_y;
        while (this.is_within_bounds(x, y)) {
            result.push(this.at(x, y));
            x += direction_x;
            y += direction_y;
        }
        return result;
    }

    protected is_line_a_strike(fields: Array<FieldModel>): false | Strike {
        const needed = 3;
        const found = fields.reduce((result: false | Strike, next: FieldModel) => {
            if (result === false) {
                if (next.type === " ") return false;
                return {
                    type: next.type,
                    count: 1,
                };
            }
            if (result.count >= needed) return result;
            if (next.type === " ") return false;
            if (next.type !== result.type) {
                return {
                    type: next.type,
                    count: 1,
                };
            }
            return {
                type: result.type,
                count: 1 + result.count,
            }
        }, false);
        if (found && found.count < needed) return false;
        return found;
    }

    public is_within_bounds(x: number, y: number) {
        return !(x < 0 || y < 0 || x >= this.width || y >= this.height);
    }
}