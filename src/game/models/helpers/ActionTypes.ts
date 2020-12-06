

export enum UserInput {
    MOVE_LEFT,
    STOP_MOVE_LEFT,
    MOVE_RIGHT,
    STOP_MOVE_RIGHT,
    MOVE_UP,
    STOP_MOVE_UP,
    MOVE_DOWN,
    STOP_MOVE_DOWN,
    ATTACK_WEAK,
    ATTACK_MEDIUM,
    ATTACK_STRONG,
    ATTACK_SPECIAL,
}

export enum Action {
    DASH_LEFT,
    DASH_RIGHT,

    STEP_LEFT,
    STEP_RIGHT,
    JUMP,

    MOVE_UP,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
}

export function is_movement_action(action: Action): boolean {
    switch (action) {
        case Action.MOVE_RIGHT:
        case Action.MOVE_LEFT:
            return true;
    }
    return false;
}
