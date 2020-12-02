'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day2-input.txt');
let data = [];
let result = 0;

fileStream
  .on('data', (chunk) => {
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    for (let i = 0; i < data.length - 1; i++) {
      // set up our checkers
      const inputParts = data[i].split(' ');

      const password = inputParts[2];
      const letter = inputParts[1][0];
      const positions = inputParts[0].split('-');
      const first = parseInt(positions[0]);
      const second = parseInt(positions[1]);
      console.log({ firstChar: password[first - 1], secondChar: password[second - 1] })

      let correctCounter = 0;
      if (password[first - 1] === letter) {
        correctCounter += 1;
      }
      if (password[second - 1] === letter) {
        correctCounter += 1;
      }

      console.log({ password, letter, first, second, correctCounter });
      // is this password good?
      if (correctCounter === 1) {
        result += 1;
      }
    }
    console.log({ result });
}).read();
