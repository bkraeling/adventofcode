"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day6-input.txt");
let data = [];
let result = 0;
const DAYS = 80;
let daysPassed = 0;

fileStream
  .on("data", (chunk) => {
    data = chunk
      .toString()
      .split(",")
      .map((d) => parseInt(d, 10));
  })
  .on("end", function () {
    // Process input
    // console.log(data);
    while (daysPassed !== DAYS) {
      daysPassed += 1;
      // console.log("Today is day ", daysPassed);
      for (let i = 0; i < data.length; i++) {
        if (data[i] === 0) {
          data[i] = 6;
          data.push(9);
        } else {
          data[i] = data[i] - 1;
        }
      }
      // console.log("Result after day ", daysPassed);
      // console.log(data);
    }
    result = data.length;
    console.log({ result });
  })
  .read();
