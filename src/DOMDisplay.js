import { elt, drawGrid, drawActors } from "./helpers";
import { scale } from "./constants";

export default class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt("div", { class: "game" }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  syncState(state) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
  }

  scrollPlayerIntoView(state) {
    const width = this.dom.clientWidth;
    const height = this.dom.clientHeight;
    const margin = width / 3;

    const left = this.dom.scrollLeft;
    const right = left + width;
    const top = this.dom.scrollTop;
    const bottom = top + height;

    const player = state.player;
    const center = player.pos.plus(player.size.times(0.5)).times(scale);

    if (center.x < left + margin) {
      this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.dom.scrollLeft = center.x + margin - width;
    }

    if (center.y < top + margin) {
      this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.dom.scrollTop = center.y + margin - height;
    }
  }

  clear() {
    this.dom.remove();
  }
}
