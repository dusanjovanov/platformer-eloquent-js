import Level from "./Level";
import DOMDisplay from "./DOMDisplay";
import "./index.css";
import State from "./State";
import gameLevels from "./gameLevels";
import { trackKeys } from "./helpers";

const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

const runAnimation = frameFunc => {
  let lastTime = null;
  const frame = time => {
    if (lastTime !== null) {
      const timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

const runLevel = (level, Display) => {
  const display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  return new Promise(resolve => {
    runAnimation(time => {
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status === "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
};

const runGame = async (plans, Display) => {
  for (let level = 0; level < plans.length; ) {
    const status = await runLevel(new Level(plans[level]), Display);
    if (status === "won") level++;
  }
  console.log("You've won!");
};

runGame(gameLevels, DOMDisplay);
