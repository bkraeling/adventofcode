'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day6-input.txt');
let data = [];
let result = 0;

fileStream
  .on('data', (chunk) => {
    // Split on blank line
    data = chunk.toString().split('\n\n');
  })
  .on('end', function () {
    for (let i = 0; i < data.length; i++) {
      const questionsArray = data[i].replace(/\n/g, '').split('');
      // dedupe array
      const uniqs = Array.from(new Set(questionsArray));

      // add uniqs to result sum
      result += uniqs.length;
    }
    console.log({ result });
}).read();
