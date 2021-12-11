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
  return { valid: true };
};

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    // Process input
    for (let i = 0; i < data.length; i++) {
      const validation = validate(data[i]);
      if (validation.valid) {
        console.log("Line", i, "is valid!");
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
    console.log({ result });
  })
  .read();
