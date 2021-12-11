"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day8-input.txt");
let data = [];
let result = 0;

const EXAMPLE = {
  0: "abcefg", // Len 6
  1: "cf", // Len 2
  2: "acdeg", // Len 5
  3: "acdfg", // Len 5
  4: "bcdf", // Len 4
  5: "abdfg", // Len 5
  6: "abdefg", // Len 6
  7: "acf", // Len 3
  8: "abcdefg", // Len 7
  9: "abcdfg", // Len 6
};

const digitsTest = [
  "abcefg",
  "cf",
  "acdeg",
  "acdfg",
  "bcdf",
  "abdfg",
  "abdefg",
  "acf",
  "abcdefg",
  "abcdfg",
];

const common = (longer, shorter) => {
  return longer
    .split("")
    .filter((d) => shorter.split("").includes(d))
    .join("");
};

const difference = (longer, shorter) => {
  return longer
    .split("")
    .filter((d) => !shorter.split("").includes(d))
    .join("");
};

const processDigits = (digits) => {
  let remainingDigits = digits;

  // Find 8
  const eight = remainingDigits.find((rd) => rd.length === 7);
  remainingDigits = remainingDigits.filter((rd) => rd !== eight);

  // Find 1
  const one = remainingDigits.find((rd) => rd.length === 2);
  remainingDigits = remainingDigits.filter((rd) => rd !== one);

  // Find 7
  const seven = remainingDigits.find((rd) => rd.length === 3);
  remainingDigits = remainingDigits.filter((rd) => rd !== seven);

  // We know what the top middle is!
  const topMiddle = difference(seven, one);

  // Find 4
  const four = remainingDigits.find((rd) => rd.length === 4);
  remainingDigits = remainingDigits.filter((rd) => rd !== four);

  // Find 5
  const topThree = difference(four, one) + topMiddle;
  const five = remainingDigits.find(
    (rd) => rd.length === 5 && common(rd, topThree).length === 3
  );
  remainingDigits = remainingDigits.filter((rd) => rd !== five);

  // Get top right
  const topRight = difference(four, five);

  // Find 2
  const two = remainingDigits.find((rd) => common(rd, five).length === 3);
  remainingDigits = remainingDigits.filter((rd) => rd !== two);

  // Find 3
  const three = remainingDigits.find((rd) => rd.length === 5);
  remainingDigits = remainingDigits.filter((rd) => rd !== three);

  // Find 6
  const six = remainingDigits.find(
    (rd) => common(rd, five).length === 5 && common(rd, topRight).length === 0
  );
  remainingDigits = remainingDigits.filter((rd) => rd !== six);

  // Get the bottom left
  const bottomLeft = difference(six, five);

  // Find 9
  const nine = remainingDigits.find(
    (rd) => common(rd, bottomLeft).length === 0
  );
  remainingDigits = remainingDigits.filter((rd) => rd !== nine);

  // Find 0
  const zero = remainingDigits[0];

  return {
    [zero]: 0,
    [one]: 1,
    [two]: 2,
    [three]: 3,
    [four]: 4,
    [five]: 5,
    [six]: 6,
    [seven]: 7,
    [eight]: 8,
    [nine]: 9,
  };
};

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    // Process input
    for (let i = 0; i < data.length; i++) {
      const parts = data[i].split("|");
      const digits = parts[0]
        .split(" ")
        .filter((d) => d !== "")
        .map((s) => s.split("").sort().join(""));
      const outputs = parts[1]
        .split(" ")
        .filter((d) => d !== "")
        .map((s) => s.split("").sort().join(""));

      const digitsMap = processDigits(digits);

      const translatedOutput = outputs
        .map((o) => digitsMap[o])
        .map((o) => o.toString())
        .join("");
      console.log({ translatedOutput });
      result += parseInt(translatedOutput, 10);
    }
    console.log({ result });
  })
  .read();
