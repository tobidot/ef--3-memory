import { TestClass } from "@game.object/ts-game-toolbox/src/testing/TestClass";

export namespace test {

    export class ExampleTest extends TestClass {

        public get_name(): string {
            return "Example Test";
        }

        public common_var = 10;

        public set_up() {
            this.common_var = 10;
        }

        public test_is_running() {
            this.assert_true(true);
        }

    }

}