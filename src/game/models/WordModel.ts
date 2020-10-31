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

    public has_character(character: string): boolean {
        return this.word.split('').includes(character);
    }

    public generate_random_word() {
        const words = ['Tannenbaum', 'Auto', 'Apfel', 'Banane', 'Kirsche', 'Sofa'];
        this.word = words[Math.trunc(Math.random() * words.length)];
    }
}