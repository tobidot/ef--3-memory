export class PlayerModel {
    public guessed_characters: Array<string> = [];
    public lives: number = 0;

    public add_guess(character: string) {
        this.guessed_characters.push(character);
    }

    public loose_live() {
        this.lives--;
    }

    public has_lost() {
        return this.lives < 0;
    }

    public reset() {
        this.guessed_characters = [];
        this.lives = 5;
    }
}