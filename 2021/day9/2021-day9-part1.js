"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day9-input.txt");
let data = [];
let result = 0;

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    // Process input
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < data[row].length; col++) {
        const point = parseInt(data[row][col], 10);
        console.log("checking ", point, "in column", col, "of row", row);
        const neighbors = [];
        // Check above
        if (row !== 0) {
          neighbors.push(parseInt(data[row - 1][col], 10));
        }
        // Check below
        if (row !== data.length - 1) {
          neighbors.push(parseInt(data[row + 1][col], 10));
        }
        // Check left
        if (col !== 0) {
          neighbors.push(parseInt(data[row][col - 1], 10));
        }
        // Check below
        if (col !== data[row].length - 1) {
          neighbors.push(parseInt(data[row][col + 1], 10));
        }
        const lowerNeighbors = neighbors.filter((n) => n < point);
        if (lowerNeighbors.length === 0 && point !== 9) {
          console.log({ point });
          result += point + 1;
        }
      }
    }
    console.log({ result });
  })
  .read();
