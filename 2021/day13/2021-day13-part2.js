"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day13-input.txt");
let dots = [];
let instructions = [];
let result = 0;

const rowReplace = (row, index, newChar) => {
  let rowChars = row.split("");
  rowChars[index] = newChar;
  return rowChars.join("");
};

function printDots() {
  let maxX = 0;
  let maxY = 0;
  for (let i = 0; i < dots.length; i++) {
    const dotCoords = dots[i].split(",");
    let x = parseInt(dotCoords[0], 10);
    let y = parseInt(dotCoords[1], 10);
    if (x > maxX) {
      maxX = x;
    }
    if (y > maxY) {
      maxY = y;
    }
  }
  let outputRows = [];
  // maxX + 1 is row length
  // maxY + 1 is number of rows
  _.times(maxY + 1, () => outputRows.push(_.repeat(".", maxX + 1)));
  // Iterate throguh dots
  for (let i = 0; i < dots.length; i++) {
    const dotCoords = dots[i].split(",");
    let x = parseInt(dotCoords[0], 10);
    let y = parseInt(dotCoords[1], 10);
    outputRows[y] = rowReplace(outputRows[y], x, "#");
  }
  // Output rows
  for (let i = 0; i < outputRows.length; i++) {
    console.log(outputRows[i]);
  }
}

fileStream
  .on("data", (chunk) => {
    const parts = chunk.toString().split("\n\n");
    dots = parts[0].split("\n");
    instructions = parts[1].split("\n");
  })
  .on("end", function () {
    console.log({ dots });
    // printDots();
    instructions.forEach((instruction) => {
      // Only do the first fold
      const instParts = instruction.substr(11).split("=");
      const changeVar = instParts[0];
      const pivot = parseInt(instParts[1], 10);
      const newDots = [];
      for (let i = 0; i < dots.length; i++) {
        const dotCoords = dots[i].split(",");
        let x = parseInt(dotCoords[0], 10);
        let y = parseInt(dotCoords[1], 10);
        if (changeVar === "x") {
          // X changes
          if (x > pivot) {
            x = pivot - (x - pivot);
          }
        } else {
          // Y changes
          if (y > pivot) {
            y = pivot - (y - pivot);
          }
        }
        newDots.push(`${x},${y}`);
      }
      dots = _.uniq(newDots);
      // printDots();
    });
    // console.log({ dots });
    // console.log({ instructions });
    // result = dots.length;
    // console.log({ result });
    printDots();
  })
  .read();
