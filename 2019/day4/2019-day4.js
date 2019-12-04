'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2019-day4-input.txt');
let data = [];
let result = 0;

function getFrequency(arr) {
  var freq = {};
  for (var i=0; i<arr.length;i++) {
      var element = arr[i];
      if (freq[element]) {
         freq[element]++;
      } else {
         freq[element] = 1;
      }
  }
  return freq;
};

function test(number) {
  // console.log("checking ", number);
  let decreaseFound = false;
  let lowDigit;
  let lastDigit;
  const numArray = number.toString().split('');
  for (let i = 0; i < numArray.length; i++) {
    const number = parseInt(numArray[i]);
    // check decrease
    if (i > 0) {
      if (number < lowDigit) {
        // console.log("found decrease!")
        decreaseFound = true;
      } else {
        lowDigit = number;
      }

    } else {
      // first digit so set lowDigit
      lowDigit = number;
    }
  }
  const frequency = getFrequency(numArray);
  // console.log({ frequency });
  const freqCounts = [];
  Object.keys(frequency).forEach((key) => {
    freqCounts.push(frequency[key]);
  });
  // console.log({ freqCounts });
  const doubleFound = freqCounts.includes(2);
  return (doubleFound && !decreaseFound);
};


fileStream
  .on('data', (chunk) => {
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    const input = data[0].split('-');
    const beginning = parseInt(input[0]);
    const end = input[1] ? parseInt(input[1]) : beginning;
    let counter = 0;
    console.log({ beginning, end });
    for (let numberToCheck = beginning; numberToCheck <= end; numberToCheck++) {
      if (test(numberToCheck)) {
        console.log(numberToCheck);
        counter++;
      }
    }
    console.log({ result: counter });
}).read();
