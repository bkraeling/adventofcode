"use strict";

const fs = require("fs");
const fileStream = fs.createReadStream("./input.txt");
let data = [];

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n\n");
  })
  .on("end", function () {
    let initialCrates = data[0].split("\n").reverse();
    let instructions = data[1].split("\n");
    let stacks = [];
    for (let i = 0; i < initialCrates[0].length; i = i + 4) {
      const stack = [];
      for (let j = 1; j < initialCrates.length; j++) {
        const crate = initialCrates[j].substr(i, 3);
        // Filter out characters we don't care about
        const filtered = crate.replace(/[^A-Z]/gi, "");
        if (filtered.length > 0) {
          stack.push(filtered);
        }
      }
      stacks.push(stack);
    }
    console.log(stacks);
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i].split(" ");
      const numberToMove = parseInt(instruction[1]);
      const fromIndex = parseInt(instruction[3]) - 1;
      const toIndex = parseInt(instruction[5]) - 1;
      for (let j = 0; j < numberToMove; j++) {
        const movingCrate = stacks[fromIndex].pop();
        stacks[toIndex].push(movingCrate);
      }
    }
    const result = stacks.map((s) => s.pop()).join("");
    console.log(stacks);
    console.log({ result });
  })
  .read();
