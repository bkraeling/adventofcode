"use strict";

const fs = require("fs");
const fileStream = fs.createReadStream("./input.txt");
let data = [];
let result = 0;

const getCommonElements = (first, second, third) => {
  const commonElements = [];
  for (let i = 0; i < first.length; i++) {
    if (second.includes(first[i]) && third.includes(first[i])) {
      commonElements.push(first[i]);
    }
  }
  return commonElements;
};

const getPriorityValues = (sack) => {
  const values = [];
  for (let i = 0; i < sack.length; i++) {
    let code = sack.charCodeAt(i);
    // Is it upper case or lower case?
    if (sack[i] === sack[i].toUpperCase()) {
      // Subtract uppercase value
      code = code - 38;
    } else {
      // Subtract lowercase value
      code = code - 96;
    }
    values.push(code);
  }
  return values;
};

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    let rucksacks = [];
    for (let i = 0; i < data.length; i++) {
      rucksacks.push(data[i]);
    }
    const priorities = [];

    for (let i = 0; i < rucksacks.length; i = i + 3) {
      const sack1 = rucksacks[i];
      const sack2 = rucksacks[i + 1];
      const sack3 = rucksacks[i + 2];
      const priorities1 = getPriorityValues(sack1);
      const priorities2 = getPriorityValues(sack2);
      const priorities3 = getPriorityValues(sack3);
      const common = [
        ...new Set(getCommonElements(priorities1, priorities2, priorities3)),
      ];
      priorities.push(common);
    }
    console.log({ priorities });
    // Flatten
    const flatArray = [].concat(...priorities);
    const sum = flatArray.reduce((acc, cur) => acc + cur, 0);
    console.log({ result: sum });
  })
  .read();
