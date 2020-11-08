import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";

export class WordModel extends Model {
    public word: string;

    constructor() {
        super();
        this.word = '';
    }

    public reveal_characters(characters: Array<string>): Array<string> {
        return this.word.split('').map((word_char) => {
            return (characters.includes(word_char.toLowerCase())) ? word_char : '';
        });
    }

    public is_complete(guessed_characters: string[]): boolean {
        const revealed = this.reveal_characters(guessed_characters).join('').toLowerCase();
        const real = this.word.toLowerCase();
        return revealed === real;
    }

    public has_character(character: string): boolean {
        return this.word.toLowerCase().split('').includes(character.toLowerCase());
    }

    public generate_random_word() {
        const words = [
            'Apple',
            'Chocolate',
            'Tree',
            'Zebra',
        ];
        this.word = words[Math.trunc(Math.random() * words.length)];
    }
}