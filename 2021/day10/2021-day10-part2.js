"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day10-input.txt");
let data = [];
let result = 0;

const opposites = {
  "<": ">",
  "(": ")",
  "[": "]",
  "{": "}",
};

const validate = (line) => {
  const charStack = [];
  for (let i = 0; i < line.length; i++) {
    const character = line[i];
    switch (character) {
      // Are we opening?
      case "[":
      case "(":
      case "{":
      case "<":
        // console.log("Open! Add", character, "to the stack.");
        charStack.push(character);
        break;
      // Okay, we're closing
      default:
        // console.log("Closing! Is", character, "what we want?");
        const openTag = charStack.pop();
        const expected = opposites[openTag];
        // console.log({ openTag, expected });
        if (character !== expected) {
          return {
            valid: false,
            error: {
              expected,
              character,
            },
          };
        }
        break;
    }
    // console.log({ charStack });
  }
  return { valid: true, remaining: charStack };
};

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    // Process input
    const lineScores = [];
    for (let i = 0; i < data.length; i++) {
      const validation = validate(data[i]);
      if (validation.valid) {
        console.log("Line", i, "is valid!");
        const closingChars = validation.remaining
          .reverse()
          .map((c) => opposites[c]);
        // console.log({ closingChars });
        let lineScore = 0;
        for (let j = 0; j < closingChars.length; j++) {
          let charScore = 0;
          switch (closingChars[j]) {
            case "]":
              charScore = 2;
              break;
            case ")":
              charScore = 1;
              break;
            case "}":
              charScore = 3;
              break;
            case ">":
              charScore = 4;
              break;
          }
          lineScore = lineScore * 5 + charScore;
        }
        console.log({ lineScore });
        lineScores.push(lineScore);
      } else {
        console.log(
          "Line",
          i,
          "is invalid: Expected",
          validation.error.expected,
          ", received",
          validation.error.character
        );
        switch (validation.error.character) {
          case "]":
            result += 57;
            break;
          case ")":
            result += 3;
            break;
          case "}":
            result += 1197;
            break;
          case ">":
            result += 25137;
            break;
        }
      }
    }
    console.log({ lineScores });
    const sortedScores = lineScores.sort((a, b) => a - b);
    console.log({ sortedScores });
    result = sortedScores[Math.floor(sortedScores.length / 2)];
    console.log({ result });
  })
  .read();
