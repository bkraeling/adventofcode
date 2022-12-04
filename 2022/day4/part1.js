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
      // Check to see if the first fully contains the second
      if (firstMin <= secondMin && firstMax >= secondMax) {
        console.log("first fully contains second");
        result++;
      } else if (secondMin <= firstMin && secondMax >= firstMax) {
        console.log("second fully contains first");
        result++;
      }
    }
    console.log({ result });
  })
  .read();
