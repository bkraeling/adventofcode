"use strict";

const fs = require("fs");
const fileStream = fs.createReadStream("./input.txt");
let data = [];
let result = 0;

const getCommonElements = (first, second) => {
  const commonElements = [];
  for (let i = 0; i < first.length; i++) {
    if (second.includes(first[i])) {
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
  const middleIndex = Math.ceil(values.length / 2);
  const first = values.slice(0, middleIndex);
  const second = values.slice(middleIndex);

  return getCommonElements(first, second);
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
    // const sack = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const priorities = [];

    for (let i = 0; i < rucksacks.length; i++) {
      const sack = rucksacks[i];
      const common = [...new Set(getPriorityValues(sack))];
      console.log({ sack, common });
      priorities.push(common);
    }
    console.log({ priorities });
    // Flatten
    const flatArray = [].concat(...priorities);
    const sum = flatArray.reduce((acc, cur) => acc + cur, 0);
    console.log({ result: sum });
  })
  .read();
