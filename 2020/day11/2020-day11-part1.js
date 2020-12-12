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

  checkAdjacents(x, y) {
    let numOccupied = 0;
    // check ones next to us
    if ((x !== 0) && this.rows[y][x-1] === OCCUPIED) {
      numOccupied++;
    }
    if ((x !== this.rowLength - 1) && this.rows[y][x+1] === OCCUPIED) {
      numOccupied++;
    }
    // check row above ours
    if (y !== 0) {
      const rowAbove = [this.rows[y-1][x-1], this.rows[y-1][x], this.rows[y-1][x+1]].filter(z => z);
      numOccupied += rowAbove.filter(o => o === OCCUPIED).length;
    }

    // check row below ours
    if (y !== this.numRows - 1) {
      const rowBelow = [this.rows[y+1][x-1], this.rows[y+1][x], this.rows[y+1][x+1]].filter(z => z);
      numOccupied += rowBelow.filter(o => o === OCCUPIED).length;
    }
    return numOccupied;
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
          if (this.checkAdjacents(x, y) === 0) {
            newRow.push(OCCUPIED);
            changes += 1;
          } else {
            newRow.push(splitRow[x]);
          }
        } else if (splitRow[x] === OCCUPIED) {
        // If a seat is occupied (#) and four or more seats adjacent to it
        //  are also occupied, the seat becomes empty.
          if (this.checkAdjacents(x, y) >= 4) {
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
