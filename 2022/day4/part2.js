"use strict";

const fs = require("fs");
const fileStream = fs.createReadStream("./input.txt");
let data = [];
let result = 0;

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    let pairs = [];
    for (let i = 0; i < data.length; i++) {
      pairs.push(data[i]);
    }

    for (let i = 0; i < pairs.length; i++) {
      const elves = pairs[i].split(",");
      console.log({ elves });
      const first = elves[0].split("-");
      const second = elves[1].split("-");
      const firstMin = parseInt(first[0]);
      const firstMax = parseInt(first[1]);
      const secondMin = parseInt(second[0]);
      const secondMax = parseInt(second[1]);
      console.log({ firstMin, firstMax, secondMin, secondMax });
      // Check for overlap
      if (firstMin < secondMin && secondMin <= firstMax) {
        console.log("overlap");
        result++;
      } else if (secondMin < firstMin && firstMin <= secondMax) {
        console.log("overlap");
        result++;
      } else if (firstMin === secondMin || firstMax === secondMax)
        if (secondMin <= firstMax || firstMin <= secondMax) {
          console.log("overlap");
          result++;
        }
    }
    console.log({ result });
  })
  .read();
