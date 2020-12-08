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
    for (let i = 0; i < data.length - 1; i++) {
      // We will change the "i"th instruction as we're running the program
      const visited = [];
      let done = false;
      let position = 0;
      let accumulator = 0;
      let changeables = 0;

      while(!done) {
        // Have we visited this node before?
        if (visited.indexOf(position) > -1) {
          // We have!
          done = true;
        } else {
          // Are we at the last command?
          if (position === data.length - 1) {
            // Yep!
            result = accumulator;
            done = true;
          }
          // Add to visited array
          visited.push(position);
          const parts = data[position].split(' ');
          let instruction = parts[0];
          const value = parseInt(parts[1]);

          // If we are at our "i"th changeable, change it
          if (i === changeables) {
            if (instruction === 'jmp') {
              instruction = 'nop';
            } else if (instruction === 'nop') {
              instruction = 'jmp';
            } else {
              // This is an acc, so do nothing
            }
          }

          console.log({ instruction, value });
          // process instruction code
          switch(instruction) {
            case 'acc':
              // Add to accumulator, go to next instruction
              accumulator += value;
              position++;
              break;
            case 'jmp':
              // Iterate changeable
              changeables++;
              // Jump to instruction
              position += value;
              break;
            case 'nop':
              // Iterate changeable
              changeables++;
              // noop, just go to the next one
              position++;
              break;
          }
        }
      }
    }
    console.log({ result });
}).read();
