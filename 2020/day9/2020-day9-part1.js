'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day9-input.txt');
let data = [];
let result = 0;
const PREAMBLE_LENGTH = 25;
const invalid = [];

fileStream
  .on('data', (chunk) => {
    // Split on blank line
    data = chunk.toString().split('\n').map(d => parseInt(d));
  })
  .on('end', function () {
    for (let i = PREAMBLE_LENGTH; i < data.length - 1; data.shift()) {
      const preamble = data.slice(0, PREAMBLE_LENGTH);
      const inverses = preamble.map(p => data[i] - p);
      let valid = false;
      console.log({ preamble, inverses, checking: data[i] })
      for (let j = 0; j < inverses.length - 1; j++) {
        // Check to see if any inverses also show up on the preamble
        if (preamble.indexOf(inverses[j]) > -1) {
          valid = true;
        }
      }
      if (!valid) {
        invalid.push(data[i]);
      }
    }
    console.log({ invalid });
    result = invalid[0];
    console.log({ result });
}).read();
