'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2019-day1-input.txt');
let data = [];
let result = 0;

function calculate(num) {
  return Math.floor(num / 3) - 2;
}
fileStream
  .on('data', (chunk) => {
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    for (let i = 0; i < data.length - 1; i++) {
      let mass = parseInt(data[i], 10);
      let massResult = 0;
      while (mass > 0) {
        mass = calculate(mass);
        if (mass < 0) {
          mass = 0;
        }
        massResult += mass;
        // console.log({ mass, massResult });
      }
      // console.log({ massResult });
      result += massResult;
    }
    console.log({ result });
}).read();
