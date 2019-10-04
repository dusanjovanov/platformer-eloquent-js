import { overlap } from "./helpers";

export default class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level) {
    return new State(level, level.startActors, "playing");
  }

  update(time, keys) {
    const actors = this.actors.map(a => a.update(time, this, keys));
    let newState = new State(this.level, actors, this.status);

    if (newState.status !== "playing") return newState;

    const player = newState.player;
    if (this.level.touches(player.pos, player.size, "lava")) {
      return new State(this.level, actors, "lost");
    }

    for (const actor of actors) {
      if (actor !== player && overlap(actor, player)) {
        newState = actor.collide(newState);
      }
    }

    return newState;
  }

  get player() {
    return this.actors.find(a => a.type === "player");
  }
}
