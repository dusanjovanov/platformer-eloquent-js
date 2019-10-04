import Vec from "./Vec";
import State from "./State";
import { wobbleSpeed, wobbleDist } from "./constants";

export default class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type() {
    return "coin";
  }

  size = new Vec(0.6, 0.6);

  collide(state) {
    const filtered = state.actors.filter(a => a !== this);
    let status = state.status;
    if (!filtered.some(a => a.type === "coin")) status = "won";
    return new State(state.level, filtered, status);
  }

  update(time) {
    const wobble = this.wobble + time * wobbleSpeed;
    const wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(
      this.basePos.plus(new Vec(0, wobblePos)),
      this.basePos,
      wobble
    );
  }

  static create(pos) {
    const basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}
