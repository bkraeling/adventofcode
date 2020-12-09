'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day9-input.txt');
let data = [];
let result = 0;
const PREAMBLE_LENGTH = 25;

const sum = (arr) => {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
};

fileStream
  .on('data', (chunk) => {
    // Split on blank line
    data = chunk.toString().split('\n').map(d => parseInt(d));
  })
  .on('end', function () {
    let invalid = 0;
    let data2 = []
    for (let i = PREAMBLE_LENGTH; i < data.length - 1; data2.push(data.shift())) {
      const preamble = data.slice(0, PREAMBLE_LENGTH);
      const inverses = preamble.map(p => data[i] - p);
      let valid = false;
      for (let j = 0; j < inverses.length - 1; j++) {
        // Check to see if any inverses also show up on the preamble
        if (preamble.indexOf(inverses[j]) > -1) {
          valid = true;
        }
      }
      if (!valid) {
        invalid = data[i];
      }
    }

    data2 = [...data2, ...data].slice(0, -1);

    let rangeFound = false;
    let a = 0;
    let b = 1;
    while (!rangeFound || (b === data2.length - 1)) {
      // look in our range for the sum
      const range = data2.slice(a, (b - a + 1));
      const rangeSum = sum(range);
      console.log({ range });
      if (rangeSum === invalid) {
        rangeFound = true;
        result = (Math.min(...range) + Math.max(...range));
      } else {
        if (rangeSum < invalid) {
          b++;
        } else {
          a++;
        }
      }
    }
    console.log({ result });
}).read();
