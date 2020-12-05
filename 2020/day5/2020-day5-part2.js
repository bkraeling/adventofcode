'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day5-input.txt');
let data = [];
let result = 0;
let lastSeat = 0;
let firstSeat = 1000;

fileStream
  .on('data', (chunk) => {
    // Split on each line
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    // Loop through to find first and last seats
    for (let i = 0; i < data.length - 1; i++) {
      // Convert to binary
      const binaryString = data[i].replace(/B|R/g, '1').replace(/F|L/g, '0');
      const seatNumber = parseInt(binaryString, 2);
      if (seatNumber > lastSeat) {
        lastSeat = seatNumber;
      }
      if (seatNumber < firstSeat) {
        firstSeat = seatNumber
      }
    }
    // Loop through and convert each seat to binary and see if it's in the list
    for (let j = firstSeat + 1; j < lastSeat; j++) {
      const idString = parseInt(j, 10).toString(2);
      // Fill in leading zeroes
      const binaryString = `${'0'.repeat(10 - idString.length)}${idString}`;
      const row = binaryString.substring(0, 7);
      const seat = binaryString.substring(7, 10);
      const boardingPass = `${row.replace(/1/g, 'B').replace(/0/g, 'F')}${seat.replace(/1/g, 'R').replace(/0/g, 'L')}`;
      if (data.indexOf(boardingPass) < 0) {
        result = j;
        break;
      }
    }
    console.log({ result });
}).read();
