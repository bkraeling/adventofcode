"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day14-input.txt");
let polymer = "";
let rules = [];
let result = 0;
const STEPS = 10;

const pairsToString = (pairs) => {
  return `${pairs.map((p) => p.split("")[0]).join("")}${
    pairs[pairs.length - 1].split("")[1]
  }`;
};
const stringToObject = (pairString) => {
  let stringObj = {};
  const stringChars = pairString.split("");
  for (let i = 0; i < stringChars.length; i++) {
    const stringChar = stringChars[i];
    if (stringObj[stringChar]) {
      stringObj[stringChar] += 1;
    } else {
      stringObj[stringChar] = 1;
    }
  }
  return stringObj;
};

fileStream
  .on("data", (chunk) => {
    const parts = chunk.toString().split("\n\n");
    polymer = parts[0];
    rules = parts[1].split("\n");
  })
  .on("end", function () {
    console.log({ polymer });
    // Setup pairs and rules
    let pairs = [];
    for (let i = 0; i < polymer.length - 1; i++) {
      pairs.push(polymer.substring(i, i + 2));
    }
    rules = rules.map((rule) => {
      const ruleParts = rule.split(" -> ");
      return { pair: ruleParts[0], add: ruleParts[1] };
    });
    // console.log({ rules });
    let step = 0;
    while (step < STEPS) {
      // Cycle through pairs
      const newPairs = [];
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        const rule = rules.find((r) => r.pair === pair);
        if (rule) {
          const pairElements = pair.split("");
          newPairs.push(`${pairElements[0]}${rule.add}`);
          newPairs.push(`${rule.add}${pairElements[1]}`);
        } else {
          newPairs.push(pair);
        }

        // console.log({ rule });
      }
      pairs = newPairs;
      // Increment step
      step += 1;
      console.log("After step:", step, pairsToString(pairs));
    }
    const pairString = pairsToString(pairs);
    console.log({ pairStringLength: pairString.length });
    const stringObject = stringToObject(pairString);
    console.log({ stringObject });
    const letterCounts = Object.values(stringObject);
    const mostCommon = Math.max(...letterCounts);
    const leastCommon = Math.min(...letterCounts);
    console.log({ letterCounts, mostCommon, leastCommon });
    result = mostCommon - leastCommon;
    console.log({ result });
  })
  .read();
