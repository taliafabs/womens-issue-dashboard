import { csvFormat, tsvParse } from "d3-dsv";

data = FileAttachment("number-of-maternal-deaths-by-region.csv").csv();

g7Countries = [
  "Canada",
  "France",
  "Germany",
  "Italy",
  "Japan",
  "United Kingdom",
  "United States",
];

filteredData = data.filter((d) => g7Countries.includes(d.Entity));

const preparedData = filteredData.map((d) => ({
  Country: d.Entity,
  Year: +d.Year, // Assuming the CSV has a column "Year"
  MaternalMortalityRate: +d["Estimated maternal deaths"], // Assuming the column is named "MaternalMortalityRate"
}));

process.stdout.write(csvFormat(preparedData));

// export function preparedData(data, g7Countries) {
//   return data
//     .filter(d => g7Countries.includes(d.Entity)) // Use 'Entity' for the country column
//     .map(d => ({
//       Country: d.Entity,
//       Year: +d.Year, // Convert Year to a number
//       MaternalMortalityRate: +d["Estimated maternal deaths"] // Convert values to numbers
//     }));
// }
