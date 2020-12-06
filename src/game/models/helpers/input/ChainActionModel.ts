import { UserInput as UserInput } from "../ActionTypes";



export class InputChain {
    public actions: Array<UserInput> = [];
    public seconds_since_last_action: number = 0;

    public update(delta_seconds: number) {
        this.seconds_since_last_action += delta_seconds;
        if (this.seconds_since_last_action > 10) {
            this.clear();
        }
    }

    public add(action: UserInput) {
        this.seconds_since_last_action = 0;
        this.actions.push(action);
    }

    public clear() {
        this.seconds_since_last_action = 0;
        this.actions = [];
    }

    public is_combo(...actions: Array<UserInput>): boolean {
        if (actions.length > this.actions.length) return false;
        const index_offset = this.actions.length - actions.length;
        return actions.map((action, index): boolean => {
            return action === this.actions[index_offset + index];
        }, this.actions).reduce((and: boolean, next: boolean): boolean => {
            return and && next;
        }, true);
    }
}