export class PlayerModel {
    public guessed_characters: Array<string> = [];
    public readonly max_lives: number = 5;
    public lives: number = 0;

    public get_lives_as_fraction(): number {
        return 1 - this.lives / this.max_lives;
    }

    public has_already_guessed(character: string): boolean {
        return this.guessed_characters.includes(character);
    }

    public add_guess(character: string) {
        this.guessed_characters.push(character);
    }

    public loose_live() {
        this.lives--;
    }

    public has_lost() {
        return this.lives <= 0;
    }

    public reset() {
        this.guessed_characters = [];
        this.lives = this.max_lives;
    }
}