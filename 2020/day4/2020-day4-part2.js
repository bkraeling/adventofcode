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
        // If required field is not present, the passport is invalid
        const value = passport[requiredFields[j]];
        if (!value) {
          valid = false;
          console.log(`Missing field: ${requiredFields[j]}`)
        } else {
          // Validate required fields
          switch(requiredFields[j]) {
            case 'byr':
              if ((value.length !== 4) ||
              (parseInt(value) < 1920) ||
              (parseInt(value) > 2002)) {
                valid = false;
                console.log('byr is invalid');
              }
              break;
            case 'iyr':
              if ((value.length !== 4) ||
              (parseInt(value) < 2010) ||
              (parseInt(value) > 2020)) {
                valid = false;
                console.log('iyr is invalid');
              }
              break;
            case 'eyr':
              if ((value.length !== 4) ||
              (parseInt(value) < 2020) ||
              (parseInt(value) > 2030)) {
                valid = false;
                console.log('eyr is invalid');
              }
              break;
            case 'hgt':
              const unit = value.substr(value.length - 2, value.length);
              const amount = parseInt(value.slice(0, -2));
              if (unit === 'cm') {
                if ((amount < 150) || (amount > 193)) {
                  valid = false;
                  console.log('hgt amount is invalid');
                }
              } else if (unit === 'in') {
                if ((amount < 59) || (amount > 76)) {
                  valid = false;
                  console.log('hgt amount is invalid');
                }
              } else {
                valid = false;
                console.log('hgt unit is invalid');
              }
              break;
            case 'hcl':
              const match = value.match(/\#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]/);
              if (!match) {
                valid = false;
                console.log('hcl is invalid');
              }
              break;
            case 'ecl':
              if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)) {
                valid = false;
                console.log('ecl is invalid');
              }
              break;
            case 'pid':
              if (value.length !== 9) {
                valid = false;
                console.log('pid is invalid');
              }
              break;
          }
        }
      }
      if (valid) {
        console.log('Valid!');
        result += 1;
      }
    }
    console.log({ result });
}).read();
