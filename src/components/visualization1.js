import * as Plot from "npm:@observablehq/plot";

export function visualization1(events, { width, height } = {}) {
  return Plot.rectY(alphabet, { x: "letter", y: "frequency" }).plot();
}
