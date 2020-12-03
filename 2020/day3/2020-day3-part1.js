'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day3-input.txt');
let data = [];
let result = 0;
let currentY = 0;
let currentX = 0;
let xInterval = 3;
let yInterval = 1;

fileStream
  .on('data', (chunk) => {
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    for (let i = 0; i < data.length - 1; i = i + yInterval) {
      const row = data[i];
      const rowLength = row.length;

      // check our current position
      if (row[currentX % rowLength] === '#') {
        // TREE!
        console.log('HIT!');
        console.log({ currentX, currentY });
        result += 1;
      } else {
        console.log('MISS!');
        console.log({ currentX, currentY });
      }

      // Move down
      currentX += xInterval;
    }
    console.log({ result });
}).read();
