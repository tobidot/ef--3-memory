import { UserInput } from "./ActionTypes";

interface FixedDirection {
    x: -1 | 0 | 1,
    y: -1 | 0 | 1,
}

export class InputDirectionControl {
    public current_control: FixedDirection = { x: 0, y: 0 };
    public seconds_in_active_control: number = 0;

    public update(delta_seconds: number) {
        if (this.is_in_active_control()) {
            this.seconds_in_active_control += delta_seconds;
        }
    }

    public input(input: UserInput) {
        const { x, y } = this.current_control;
        this.if_user_input_is__activate_deactivate__set_value(input, UserInput.MOVE_LEFT, UserInput.STOP_MOVE_LEFT, 'x', -1);
        this.if_user_input_is__activate_deactivate__set_value(input, UserInput.MOVE_RIGHT, UserInput.STOP_MOVE_RIGHT, 'x', 1);
        this.if_user_input_is__activate_deactivate__set_value(input, UserInput.MOVE_UP, UserInput.STOP_MOVE_UP, 'y', -1);
        this.if_user_input_is__activate_deactivate__set_value(input, UserInput.MOVE_DOWN, UserInput.STOP_MOVE_DOWN, 'y', 1);
        this.reset_timer_if_no_control_direction();
    }

    public reset_timer_if_no_control_direction() {
        if (this.is_in_active_control()) {
            this.seconds_in_active_control = 0;
        }
    }

    public is_in_active_control(): boolean {
        return 0 !== this.current_control.x || 0 !== this.current_control.y;
    }

    public if_user_input_is__activate_deactivate__set_value(
        input: UserInput,
        activate: UserInput,
        deactivate: UserInput,
        axis: keyof FixedDirection,
        value: -1 | 0 | 1,
    ) {
        if (input === activate) {
            this.current_control[axis] = value;
        }
        if (input === deactivate && this.current_control[axis] === value) {
            this.current_control[axis] = 0;
        }
    }
}