"use strict";

const fs = require("fs");
const fileStream = fs.createReadStream("./input.txt");
let data = [];
let result = 0;

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n\n");
  })
  .on("end", function () {
    let elves = [];
    for (let i = 0; i < data.length; i++) {
      elves.push(data[i]);
    }
    const totals = elves.map((elf) => {
      const foods = elf.split("\n");
      const total = foods.reduce((acc, cur) => acc + parseInt(cur), 0);
      return total;
    });
    const sorted = totals.sort((a, b) => b - a);
    result = sorted[0] + sorted[1] + sorted[2];
    console.log({ result });
  })
  .read();
