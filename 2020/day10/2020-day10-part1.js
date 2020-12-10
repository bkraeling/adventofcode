'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day10-input.txt');
let data = [];
let result = 0;
let current = 0;
let oneJumps = 0;
let threeJumps = 0;

fileStream
  .on('data', (chunk) => {
    // Split on blank line
    data = chunk.toString().split('\n').map(d => parseInt(d)).filter(f => !isNaN(f));
  })
  .on('end', function () {
    data.sort((a, b) => (a - b));
    data.push(data[data.length - 1] + 3);
    console.log({ data });
    while (data.length > 0) {
      const number = data.shift();
      const diff = number - current;
      if (diff === 1) {
        oneJumps++;
        console.log('one jump');
      } else if (diff === 3) {
        threeJumps++;
        console.log('three jump');
      } else {
        console.log('two jump');
      }
      current = number;
    }
    console.log({ oneJumps, threeJumps });
    result = oneJumps * threeJumps;
    console.log({ result });
}).read();
