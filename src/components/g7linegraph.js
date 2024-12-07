// Import data from the data directory
import data from "../data/maternalMortalityRates.json";

// JavaScript (insert into a script tag or JS file)

document.addEventListener("DOMContentLoaded", () => {
  const countries = ["Canada", "France", "Germany", "Italy", "Japan", "United Kingdom", "United States"];

  // Dropdown population
  const countrySelect = document.getElementById("country-select");
  countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
  });

  // Initializing chart with D3.js
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const width = 800 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select("#graph-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleLinear().domain([1970, 2022]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale);

  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  svg.append("g")
    .call(yAxis);

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Maternal Mortality Rates in the G7 (1970-2022)");

  const line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.rate));

  const drawLine = (country) => {
    svg.selectAll(".line").remove();
    svg.selectAll(".tooltip").remove();

    const countryData = data[country].map((d, i) => ({ year: 1970 + i, rate: d }));

    svg.append("path")
      .datum(countryData)
      .attr("class", "line")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "steelblue")
      .style("stroke-width", 2);

    const tooltip = svg.append("text")
      .attr("class", "tooltip")
      .attr("x", 10)
      .attr("y", 10)
      .style("font-size", "12px");

    svg.selectAll(".dot")
      .data(countryData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.rate))
      .attr("r", 4)
      .style("fill", "red")
      .on("mouseover", (event, d) => {
        tooltip.text(`${d.year}: ${d.rate}`)
          .attr("x", xScale(d.year) + 10)
          .attr("y", yScale(d.rate) - 10);
      })
      .on("mouseout", () => {
        tooltip.text("");
      });
  };

  countrySelect.addEventListener("change", () => {
    const selectedCountry = countrySelect.value;
    drawLine(selectedCountry);
  });

  const yearRange = document.getElementById("year-range");
  const yearLabel = document.getElementById("year-label");

  yearRange.addEventListener("input", () => {
    const year = yearRange.value;
    yearLabel.textContent = year;

    // Optionally filter the data based on the year range
    // Redraw lines for selected countries
  });

  // Initial setup
  drawLine("United States");
});
