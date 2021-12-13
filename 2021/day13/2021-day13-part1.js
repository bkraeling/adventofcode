"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day13-input.txt");
let dots = [];
let instructions = [];
let result = 0;

fileStream
  .on("data", (chunk) => {
    const parts = chunk.toString().split("\n\n");
    dots = parts[0].split("\n");
    instructions = parts[1].split("\n");
  })
  .on("end", function () {
    console.log({ dots });
    instructions.forEach((instruction, index) => {
      // Only do the first fold
      if (index === 0) {
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
        console.log({ dots });
      }
    });
    // console.log({ dots });
    // console.log({ instructions });
    result = dots.length;
    console.log({ result });
  })
  .read();
