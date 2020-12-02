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
      const freqs = inputParts[0].split('-');
      const minFreq = freqs[0];
      const maxFreq = freqs[1];
      let freqCounter = 0;
      // iterate through password
      for (let j = 0; j < password.length; j++) {
        if (password[j] === letter) {
          freqCounter += 1;
        }
      }
      console.log({ password, letter, minFreq, maxFreq, freqCounter });
      // is this password good?
      if (freqCounter >= minFreq && freqCounter <= maxFreq) {
        result += 1;
      }
    }
    console.log({ result });
}).read();
