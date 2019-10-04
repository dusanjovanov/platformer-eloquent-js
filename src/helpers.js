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
