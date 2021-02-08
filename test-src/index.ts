import { TestDashboard } from "@game.object/ts-game-toolbox/src/testing/TestDashboard";
import { test } from "./features/ExampleTest";

const element = document.getElementById('test-dashboard');
if (!element) throw new Error('Element not found');
const dashboard = new TestDashboard();
element.append(dashboard.get_element());

dashboard.add_test([
    new test.ExampleTest(),
]);
