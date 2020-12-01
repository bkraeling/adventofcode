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
    let results = [];
    for (let i = 0; i < data.length - 1; i++) {
      results.push(data[i] * (2020 - data[i]));
    }
    // Check to see which numbers are duplicated
    console.log({ results });
    const result = results.filter((item, index) => results.indexOf(item) !== index);
    console.log({ result });
}).read();
