'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day1-input.txt');
let data = [];
let result = 0;

fileStream
  .on('data', (chunk) => {
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    let uniqueSums = [];
    for (let i = 0; i < data.length - 1; i++) {
      for (let j = i + 1; j < data.length - 1; j++) {
        if (data.indexOf((2020 - data[i] - data[j]).toString()) !== -1) {
          result = parseInt(data[i]) * parseInt(data[j]) * (2020 - data[i] - data[j]);
        }
      }
    }
    console.log({ result });
}).read();
