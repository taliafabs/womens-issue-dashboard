import * as Plot from "npm:@observablehq/plot";
import {
  select,
  scaleLinear,
  scaleTime,
  line,
  axisBottom,
  axisLeft,
  extent,
  max,
  pointer,
} from "d3";
import { preparedData } from "./data/maternal-mortality.csv.js";

// Dimensions
margin = { top: 20, right: 20, bottom: 80, left: 80 };
width = 800 - margin.left - margin.right;
height = 500 - margin.top - margin.bottom;

// Create scales
xScale = scaleLinear()
  .domain(extent(preparedData, (d) => d.Year))
  .range([0, width]);

yScale = scaleLinear()
  .domain([0, max(preparedData, (d) => d.MaternalMortalityRate)])
  .nice()
  .range([height, 0]);

// Create SVG container
svg = select(
  DOM.svg(
    width + margin.left + margin.right,
    height + margin.top + margin.bottom,
  ),
)
  .attr("viewBox", [
    0,
    0,
    width + margin.left + margin.right,
    height + margin.top + margin.bottom,
  ])
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Add axes
svg
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(
    axisBottom(xScale)
      .ticks(10)
      .tickFormat((d) => d),
  );

svg.append("g").call(axisLeft(yScale));

// Add labels
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", height + margin.bottom - 30)
  .attr("text-anchor", "middle")
  .text("Year");

svg
  .append("text")
  .attr("x", -height / 2)
  .attr("y", -margin.left + 20)
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Maternal Mortality Rate");

// Add tooltip
tooltip = svg.append("g").style("display", "none");

tooltip.append("circle").attr("r", 5).attr("fill", "steelblue");

tooltip.append("text").attr("x", 10).attr("y", -10);

// Add hover interaction
hover = (event) => {
  const [x, y] = pointer(event);
  const year = Math.round(xScale.invert(x));
  const nearestPoint = preparedData.reduce((prev, curr) =>
    Math.abs(curr.Year - year) < Math.abs(prev.Year - year) ? curr : prev,
  );
  if (nearestPoint) {
    tooltip.attr(
      "transform",
      `translate(${xScale(nearestPoint.Year)},${yScale(nearestPoint.MaternalMortalityRate)})`,
    );
    tooltip
      .select("text")
      .text(
        `${nearestPoint.Country}: ${nearestPoint.MaternalMortalityRate} (${nearestPoint.Year})`,
      );
    tooltip.style("display", null);
  }
};

svg
  .append("rect")
  .attr("width", width)
  .attr("height", height)
  .style("fill", "none")
  .style("pointer-events", "all")
  .on("mousemove", hover)
  .on("mouseout", () => tooltip.style("display", "none"));

// Add slider
