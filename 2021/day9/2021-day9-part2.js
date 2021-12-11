"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day9-input.txt");
let data = [];
let result = 0;

let basins = [];

const getNeighborCoords = (row, col) => {
  const neighbors = [];
  // Check above
  if (row !== 0) {
    neighbors.push(`${row - 1},${col}`);
  }
  // Check below
  if (row !== data.length - 1) {
    neighbors.push(`${row + 1},${col}`);
  }
  // Check left
  if (col !== 0) {
    neighbors.push(`${row},${col - 1}`);
  }
  // Check below
  if (col !== data[row].length - 1) {
    neighbors.push(`${row},${col + 1}`);
  }
  return neighbors;
};

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    // Process input
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < data[row].length; col++) {
        const point = parseInt(data[row][col], 10);
        const coords = `${row},${col}`;
        if (point !== 9) {
          // We are in a basin!
          // Do I have a neighbor that is already in a basin?
          const neighborCoords = getNeighborCoords(row, col);
          let found = false;
          for (let basinIndex = 0; basinIndex < basins.length; basinIndex++) {
            const neighborsInBasins = _.intersection(
              neighborCoords,
              basins[basinIndex]
            );
            if (neighborsInBasins.length > 0) {
              basins[basinIndex].push(coords);
              found = true;
            }
          }
          if (!found) {
            // No basin already exists, so create one
            console.log("Creating new basin with coords:", coords);
            basins.push([coords]);
          }
        }
      }
    }
    // Combine basins
    const combinedBasins = [];
    for (let basinIndex = 0; basinIndex < basins.length; basinIndex++) {
      // If another basin exists with a coordinate we have here, they should combine
      let found = false;
      for (
        let combinedBasinIndex = 0;
        combinedBasinIndex < combinedBasins.length;
        combinedBasinIndex++
      ) {
        const existingBasins = _.intersection(
          combinedBasins[combinedBasinIndex],
          basins[basinIndex]
        );
        if (existingBasins.length > 0) {
          combinedBasins[combinedBasinIndex] = [
            ...combinedBasins[combinedBasinIndex],
            ...basins[basinIndex],
          ];
          found = true;
        }
      }
      if (!found) {
        // No basin found, so just add it
        combinedBasins.push(basins[basinIndex]);
      }
    }
    // Dedupe
    const dedupedBasins = combinedBasins.map((cb) => _.uniq(cb));
    const basinSizes = dedupedBasins.map((cb) => cb.length);
    const top3 = basinSizes.sort((a, b) => b - a).slice(0, 3);
    console.log({ top3 });
    result = top3[0] * top3[1] * top3[2];
    console.log({ result });
  })
  .read();
