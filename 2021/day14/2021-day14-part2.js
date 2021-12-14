"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day14-input.txt");
let polymer = "";
let rules = [];
let result = 0;
const STEPS = 40;

const pairMapToStringLength = (pairMap) => {
  return _.sum(Object.values(pairMap)) + 1;
};

const ruleToPairs = (pair, result) => {
  const newPairs = [];
  const pairElements = pair.split("");
  newPairs.push(`${pairElements[0]}${result}`);
  newPairs.push(`${result}${pairElements[1]}`);
  return newPairs;
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
    let pairFreqs = {};
    for (let i = 0; i < polymer.length - 1; i++) {
      const pair = polymer.substring(i, i + 2);
      if (pairFreqs[pair]) {
        pairFreqs[pair] += 1;
      } else {
        pairFreqs[pair] = 1;
      }
    }
    rules = rules.map((rule) => {
      const ruleParts = rule.split(" -> ");
      return { pair: ruleParts[0], add: ruleParts[1] };
    });
    // console.log({ rules });
    let step = 0;
    while (step < STEPS) {
      // Cycle through pair frequencies
      let newPairFreqs = {};
      const pairs = Object.keys(pairFreqs);

      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        const rule = rules.find((r) => r.pair === pair);
        if (rule) {
          const freq = pairFreqs[pair];
          const newPairs = ruleToPairs(rule.pair, rule.add);
          newPairs.forEach((newPair) => {
            if (newPairFreqs[newPair]) {
              newPairFreqs[newPair] += freq;
            } else {
              newPairFreqs[newPair] = freq;
            }
          });
        } else {
          if (newPairFreqs[pair]) {
            newPairFreqs[pair] += pairFreqs[pair];
          } else {
            newPairFreqs[pair] = pairFreqs[pair];
          }
        }
      }
      pairFreqs = newPairFreqs;
      // Increment step
      step += 1;
      console.log("After step:", step);
      console.log({ pairFreqs });
    }
    console.log("Length:", pairMapToStringLength(pairFreqs));
    let letterFreqs = {};
    Object.keys(pairFreqs).forEach((pair) => {
      const pairLetters = pair.split("");
      if (letterFreqs[pairLetters[0]]) {
        letterFreqs[pairLetters[0]] += pairFreqs[pair];
      } else {
        letterFreqs[pairLetters[0]] = pairFreqs[pair];
      }
    });
    const lastLetter = polymer.slice(-1);
    if (letterFreqs[lastLetter]) {
      letterFreqs[lastLetter] += 1;
    } else {
      letterFreqs[lastLetter] = 1;
    }
    console.log({ letterFreqs });
    const letterCounts = Object.values(letterFreqs);
    const mostCommon = Math.max(...letterCounts);
    const leastCommon = Math.min(...letterCounts);
    console.log({ letterCounts, mostCommon, leastCommon });
    result = mostCommon - leastCommon;
    console.log({ result });
  })
  .read();
