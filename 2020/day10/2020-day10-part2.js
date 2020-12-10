'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day10-input.txt');
let data = [];
let result = 1;

fileStream
  .on('data', (chunk) => {
    // Split on blank line
    data = chunk.toString().split('\n').map(d => parseInt(d)).filter(f => !isNaN(f));
  })
  .on('end', function () {
    data.sort((a, b) => (a - b));
    data = [0, ...data];
    data.push(data[data.length - 1] + 3);
    console.log({ data, length: data.length });
    let prevOptions = [data[0]];
    let totals = [1];
    let didLastMatch = false;
    for (let i = 0; i < data.length - 1; i++) {
      const number = data[i];
      const nextThree = data.slice(i + 1, i + 4);
      const options = nextThree.filter(z => (z <= number + 3));
      const newOptions = options.filter(o => prevOptions.indexOf(o) === -1);
      console.log({ number, nextThree, options, newOptions });
      if (options.length > 0) {
        if (options.length === newOptions.length) {
          // all of our options are new
          result *= newOptions.length;
          console.log(`new result is ${result}`);
          didLastMatch = true;
        } else if (options.length > newOptions.length) {
          if (newOptions.length === 0) {
            // no new options, so just do our previous times the option number
            // if the last one matched we need the reference, if not we need the difference
            if (didLastMatch) {
              result += (totals[i - 1]) * (options.length - 1);
            } else {
              result += (totals[i] - totals[i - 1]) * (options.length - 1);
            }
            console.log({ didLastMatch, totals, i, options });
            console.log(`new result is ${result}`);
            didLastMatch = false;
          } else {
            const news = options.length - 1;
            const lengthDiff = options.length - newOptions.length;
            result += (totals[i - 1]) * lengthDiff;
            didLastMatch = false;
          }
        }
        totals.push(result);
        prevOptions = options;
      }
    }
    console.log({ result });
}).read();
