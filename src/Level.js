import Vec from "./Vec";
import Player from "./Player";
import Coin from "./Coin";
import Lava from "./Lava";

export default class Level {
  constructor(plan) {
    const rows = plan
      .trim()
      .split("\n")
      .map(r => [...r]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        const type = levelChars[ch];
        if (typeof type === "string") return type;
        this.startActors.push(type.create(new Vec(x, y), ch));
        return "empty";
      });
    });
  }
}

const levelChars = {
  ".": "empty",
  "+": "lava",
  "#": "wall",
  "@": Player,
  o: Coin,
  "=": Lava,
  "|": Lava,
  v: Lava
};
