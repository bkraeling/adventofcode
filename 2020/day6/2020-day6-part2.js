'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day6-input.txt');
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

fileStream
  .on('data', (chunk) => {
    // Split on blank line
    data = chunk.toString().split('\n\n');
  })
  .on('end', function () {
    for (let i = 0; i < data.length; i++) {
      const people = data[i].split('\n').filter(p => p !== '');
      const questionsArray = data[i].replace(/\n/g, '').split('');

      const freq = getFrequency(questionsArray);
      const numPeople = people.length;
      const uniqs = Array.from(new Set(questionsArray));
      const resultArray = [];
      for (let j = 0; j < uniqs.length; j++) {
        if (freq[uniqs[j]] === numPeople) {
          resultArray.push(uniqs[j]);
        }
      }
      result += resultArray.length;
    }
    console.log({ result });
}).read();
