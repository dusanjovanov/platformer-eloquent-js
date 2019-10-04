import { scale } from "./constants";

export const elt = (name, attrs, ...children) => {
  const dom = document.createElement(name);
  for (const attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (const child of children) {
    dom.appendChild(child);
  }
  return dom;
};

export const drawGrid = level => {
  return elt(
    "table",
    {
      class: "background",
      style: `width: ${level.width * scale}px;`
    },
    ...level.rows.map(row =>
      elt(
        "tr",
        {
          style: `height: ${scale}px;`
        },
        ...row.map(type => elt("td", { class: type }))
      )
    )
  );
};

export const drawActors = actors => {
  return elt(
    "div",
    {},
    ...actors.map(actor => {
      const rect = elt("div", { class: `actor ${actor.type}` });
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;
      return rect;
    })
  );
};

export const trackKeys = keys => {
  const down = {};
  const track = e => {
    if (keys.includes(e.key)) {
      down[e.key] = e.type === "keydown";
      e.preventDefault();
    }
  };
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  return down;
};

export const overlap = (actor1, actor2) => {
  return (
    actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pos.x < actor2.pos.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y
  );
};
