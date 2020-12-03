'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day3-input.txt');
let data = [];
let result = 1;
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
];
const slopeResults = [];

fileStream
  .on('data', (chunk) => {
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    // check each slope
    for (let s = 0; s < slopes.length; s++) {
      // initialize our slope run
      let slopeResult = 0;
      let currentY = 0;
      let currentX = 0;

      const xInterval = slopes[s][0];
      const yInterval = slopes[s][1];

      for (let i = 0; i < data.length - 1; i = i + yInterval) {
        const row = data[i];
        const rowLength = row.length;

        // check our current position
        if (row[currentX % rowLength] === '#') {
          // TREE!
          slopeResult += 1;
        }

        // Move down
        currentX += xInterval;
      }
      console.log({ slopeResult });
      slopeResults.push(slopeResult);
    }
    for (let t = 0; t < slopeResults.length; t++) {
      result = result * slopeResults[t];
    }
    console.log({ result });
}).read();
