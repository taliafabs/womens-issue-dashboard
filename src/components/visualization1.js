import * as Plot from "npm:@observablehq/plot";

export function visualization1(g7, { width, height } = {}) {
  return Plot.plot({
    style: "overflow: visible;",
    y: { grid: true },
    marks: [
      Plot.ruleY([0]),
      Plot.lineY(g7, { x: "Year", y: "rate100k", stroke: "Entity", tip: "x" }),
      Plot.text(
        g7,
        Plot.selectLast({
          x: "year",
          y: "rate100k",
          z: "Entity",
          text: "Entity",
          textAnchor: "start",
          dx: 3,
        }),
      ),
    ],
  });
}
