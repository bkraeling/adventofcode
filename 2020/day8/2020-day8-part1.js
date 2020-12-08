'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day8-input.txt');
let data = [];
let result = 0;

fileStream
  .on('data', (chunk) => {
    // Split on blank line
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    const visited = [];
    let done = false;
    let position = 0;
    let accumulator = 0;
    while(!done) {
      // Have we visited this node before?
      if (visited.indexOf(position) > -1) {
        // We have!
        result = accumulator;
        done = true;
      } else {
        // Add to visited array
        visited.push(position);
        const parts = data[position].split(' ');
        const instruction = parts[0];
        const value = parseInt(parts[1]);
        console.log({ instruction, value });
        // process instruction code
        switch(instruction) {
          case 'acc':
            // Add to accumulator, go to next instruction
            accumulator += value;
            position++;
            break;
          case 'jmp':
            // Jump to instruction
            position += value;
            break;
          case 'nop':
            // noop, just go to the next one
            position++;
            break;
        }
      }
    }
    console.log({ result });
}).read();
