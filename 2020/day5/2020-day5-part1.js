'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day5-input.txt');
let data = [];
let result = 0;

fileStream
  .on('data', (chunk) => {
    // Split on each line
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    for (let i = 0; i < data.length - 1; i++) {
      // Convert to binary
      const binaryString = data[i].replace(/B|R/g, '1').replace(/F|L/g, '0');
      const seatNumber = parseInt(binaryString, 2);
      if (seatNumber > result) {
        result = seatNumber;
      }
    }
    console.log({ result });
}).read();
