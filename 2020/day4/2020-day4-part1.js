'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day4-input.txt');
let data = [];
let result = 0;

const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
];

fileStream
  .on('data', (chunk) => {
    // Split on blank lines
    data = chunk.toString().split('\n\n');
  })
  .on('end', function () {
    for (let i = 0; i < data.length; i++) {
      const passportString = data[i].replace(/\n/g, ' ').replace(/[a-z][a-z][a-z]:[a-z0-9A-Z#]*/g, function(s) {
        const values = s.split(':');
        return `"${values[0]}":"${values[1]}",`;
      });
      // console.log({ passportString });

      const passport = JSON.parse(`{${passportString.trim().slice(0, -1)}}`);
      // console.log({ passport });

      let valid = true;
      // check required fields to confirm that all are present
      for (let j = 0; j < requiredFields.length; j++) {
        if (!passport[requiredFields[j]]) {
          valid = false;
          // console.log(`Missing field: ${requiredFields[j]}`)
        }
      }
      if (valid) {
        // console.log('Valid!');
        result += 1;
      }
    }
    console.log({ result });
}).read();
