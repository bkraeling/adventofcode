'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day11-input.txt');
let data = [];
let result = 0;

const EMPTY = 'L';
const OCCUPIED = '#';
const FLOOR = '.';

class SeatingChart {
  constructor(seatArray) {
    this.rows = [];
    for(let i = 0; i < seatArray.length - 1; i++) {
      this.rows.push(seatArray[i]);
    }
    this.numRows = this.rows.length;
    this.rowLength = this.rows[0].length;
  }

  print() {
    for(let i = 0; i < this.rows.length; i++) {
      console.log(this.rows[i]);
    }
  }

  countOccupied() {
    let total = 0;
    for(let i = 0; i < this.rows.length; i++) {
      total += this.rows[i].split('').filter(o => o === OCCUPIED).length;
    }
    return total;
  }

  checkPositions(startingX, startingY, xDirection, yDirection) {
    let found = false;
    let isOccupied = false;
    let x = startingX + xDirection;
    let y = startingY + yDirection;
    while (!found) {
      // if seat does not exist, we're done
      if ((y === -1) || (x === -1) || (y === this.numRows) || (x === this.rowLength)) {
        found = true;
      } else {
        const seat = this.rows[y][x];
        if (seat !== FLOOR) {
          if (seat === OCCUPIED) {
            isOccupied = true;
          }
          found = true;
        }
        y += yDirection;
        x += xDirection;
      }
    }
    return isOccupied;
  }

  checkNearestInEveryDirection(x, y) {
    const positions = [
      this.checkPositions(x, y, -1, -1),
      this.checkPositions(x, y, -0, -1),
      this.checkPositions(x, y, 1, -1),
      this.checkPositions(x, y, -1, 0),
      this.checkPositions(x, y, 1, 0),
      this.checkPositions(x, y, -1, 1),
      this.checkPositions(x, y, 0, 1),
      this.checkPositions(x, y, 1, 1)
    ];
    return positions.filter(x => x).length;
  }

  traverse() {
    let changes = 0;
    let newRows = [];
    for(let y = 0; y < this.numRows; y++) {
      const splitRow = this.rows[y].split('');
      let newRow = [];
      for(let x = 0; x < splitRow.length; x++) {
        // RULES GO HERE
        if (splitRow[x] === EMPTY) {
          // If a seat is empty (L) and there are no occupied seats adjacent to it,
          // the seat becomes occupied.
          if (this.checkNearestInEveryDirection(x, y) === 0) {
            newRow.push(OCCUPIED);
            changes += 1;
          } else {
            newRow.push(splitRow[x]);
          }
        } else if (splitRow[x] === OCCUPIED) {
        // If a seat is occupied (#) and four or more seats adjacent to it
        //  are also occupied, the seat becomes empty.
          if (this.checkNearestInEveryDirection(x, y) >= 5) {
            newRow.push(EMPTY);
            changes += 1;
          } else {
            newRow.push(splitRow[x]);
          }
        } else {
          // Floor
          newRow.push(splitRow[x]);
        }
      }
      newRows.push(newRow.join(''));
    }
    this.rows = newRows;
    return changes;
  }
}

fileStream
  .on('data', (chunk) => {
    // Split on blank line
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    const chart = new SeatingChart(data);
    chart.checkNearestInEveryDirection(3,3);
    let unchanged = false;

    while (!unchanged) {
      const numChanges = chart.traverse();
      console.log({ numChanges });
      if (numChanges === 0) {
        // we're done!
        unchanged = true;
        result = chart.countOccupied();
      }
    }
    console.log({ result });
}).read();
