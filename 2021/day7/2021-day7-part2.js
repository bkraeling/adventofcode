"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day7-input.txt");
let data = [];
let result = 0;

const calcSum = (data, point) => {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    const difference = Math.abs(data[i] - point);
    sum += (difference * (difference + 1)) / 2;
  }
  return sum;
};

fileStream
  .on("data", (chunk) => {
    data = chunk
      .toString()
      .split(",")
      .map((d) => parseInt(d, 10));
  })
  .on("end", function () {
    // Process input
    console.log(data);
    let minimum = 1;
    let maximum = Math.max(...data);
    let pivotB = Math.round((maximum + minimum) / 2);
    let pivotC = pivotB + 1;
    let pivotA = pivotB - 1;
    console.log({ minimum, maximum, pivotA, pivotB, pivotC });
    let found = false;
    while (!found) {
      console.log({ maximum, minimum, pivotA, pivotB, pivotC });
      const sumA = calcSum(data, pivotA);
      const sumB = calcSum(data, pivotB);
      const sumC = calcSum(data, pivotC);
      console.log({ sumA, sumB, sumC });
      if (sumB < sumA && sumB < sumC) {
        // B is the middle
        result = sumB;
        found = true;
      } else if (sumA < sumB) {
        // Go down
        maximum = pivotB;
        pivotB = Math.round((pivotB + minimum) / 2);
        pivotC = pivotB + 1;
        pivotA = pivotB - 1;
      } else if (sumC < sumB) {
        // Go up
        minimum = pivotB;
        pivotB = Math.round((pivotB + maximum) / 2);
        pivotC = pivotB + 1;
        pivotA = pivotB - 1;
      } else {
        console.log("WHAT?");
        found = true;
      }
    }

    console.log({ result });
  })
  .read();
