import Level from "./Level";
import DOMDisplay from "./DOMDisplay";
import './index.css';
import State from "./State";

const simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................
`;

const simpleLevel = new Level(simpleLevelPlan);
const display = new DOMDisplay(document.body, simpleLevel);
display.syncState(State.start(simpleLevel));