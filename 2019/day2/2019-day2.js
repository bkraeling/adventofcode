'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2019-day2-input.txt');
let data = [];
let result = 0;

function testProgram(input1, input2, initialProgram) {
  let program = new Array(...initialProgram);
  program[1] = input1;
  program[2] = input2;
  for (let i = 0; i < program.length - 1; i += 4) {
    const opcode = program[i];
    if (opcode === 1) {
      // add
      program[program[i + 3]] = program[program[i + 1]] + program[program[i + 2]]
    } else if (opcode === 2) {
      // multiply
      program[program[i + 3]] = program[program[i + 1]] * program[program[i + 2]]
    } else if (opcode === 99) {
      // done
    }
  }
  return program[0];
}

fileStream
  .on('data', (chunk) => {
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    let initialProgram = data[0].split(',').map(d => parseInt(d));
    // let inputFound = false;
    // while (!inputFound) {
      for(let j = 0; j < 99; j++) {
        for(let k = 0; k < 99; k++) {
          const output = testProgram(j, k, initialProgram);
          // console.log({ j, k, output });
          if (output === 19690720) {
            console.log({ j, k });
            // inputFound = true;
          }
        }
      }
    // }
    // const output = testProgram(0, 0, initialProgram);
    // console.log({ output });
    // console.log({ result: program.join(',') });
}).read();
