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

  touches(pos, size, type) {
    const xStart = Math.floor(pos.x);
    const xEnd = Math.ceil(pos.x + size.x);
    const yStart = Math.floor(pos.y);
    const yEnd = Math.ceil(pos.y + size.y);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        const isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
        const here = isOutside ? "wall" : this.rows[y][x];
        if (here === type) return true;
      }
    }
    return false;
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
