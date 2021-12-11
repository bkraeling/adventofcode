"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day11-input.txt");
let data = [];
let result = 0;
const STEPS = 100;

const rowReplace = (row, index, newChar) => {
  let rowChars = row.split("");
  rowChars[index] = newChar;
  return rowChars.join("");
};

const coordStringToNumbers = (coordString) => {
  const stringParts = coordString.split(",");
  return {
    row: parseInt(stringParts[0], 10),
    col: parseInt(stringParts[1], 10),
  };
};

const getNeighborCoords = (row, col) => {
  const neighbors = [
    [row - 1, col - 1], // Upper left
    [row - 1, col], // Above
    [row - 1, col + 1], // Upper right
    [row, col - 1], // Left
    [row, col + 1], // Right
    [row + 1, col - 1], // Lower left
    [row + 1, col], // Below
    [row + 1, col + 1], // Lower right
  ];
  // Filter out upper and lower bounds
  return neighbors
    .filter((n) => n[0] !== -1)
    .filter((n) => n[1] !== -1)
    .filter((n) => n[0] !== data.length)
    .filter((n) => n[1] !== data[0].length)
    .map((n) => `${n[0]},${n[1]}`);
};

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    // Process input
    let step = 0;
    let rows = data;
    while (step < STEPS) {
      step += 1;
      let flashQueue = [];
      // Increase all by one
      let newRows = [];
      for (let row = 0; row < rows.length; row++) {
        let newRow = "";
        for (let col = 0; col < rows[row].length; col++) {
          const octopus = parseInt(rows[row][col], 10);
          if (octopus === 9) {
            newRow = newRow.concat("0");
            flashQueue.push(`${row},${col}`);
          } else {
            newRow = newRow.concat(`${octopus + 1}`);
          }
        }
        newRows.push(newRow);
      }
      // console.log("After increment:");
      // for (let i = 0; i < newRows.length; i++) {
      //   console.log(newRows[i]);
      // }
      while (flashQueue.length > 0) {
        result += 1;
        const currentFlash = flashQueue.shift();
        // console.log("handling flash at", currentFlash);
        const { row, col } = coordStringToNumbers(currentFlash);
        const neighbors = getNeighborCoords(row, col);
        // console.log({ neighbors });
        for (let index = 0; index < neighbors.length; index++) {
          const neighborCoords = coordStringToNumbers(neighbors[index]);
          const octopus = parseInt(
            newRows[neighborCoords.row][neighborCoords.col],
            10
          );
          if (octopus === 9) {
            newRows[neighborCoords.row] = rowReplace(
              newRows[neighborCoords.row],
              neighborCoords.col,
              "0"
            );
            flashQueue.push(`${neighborCoords.row},${neighborCoords.col}`);
          } else if (octopus !== 0) {
            newRows[neighborCoords.row] = rowReplace(
              newRows[neighborCoords.row],
              neighborCoords.col,
              `${octopus + 1}`
            );
          }
        }
        // for (let i = 0; i < newRows.length; i++) {
        //   console.log(newRows[i]);
        // }
      }
      rows = newRows;
      console.log("After step", step);
      for (let i = 0; i < rows.length; i++) {
        console.log(rows[i]);
      }
    }
    console.log({ result });
  })
  .read();
