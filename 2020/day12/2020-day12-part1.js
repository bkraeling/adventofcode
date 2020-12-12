'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day12-input.txt');
let data = [];
let result = 0;

// Direction constants in degrees
const NORTH = 0;
const EAST = 90;
const SOUTH = 180;
const WEST = 270;

class Ship {
  constructor() {
    this.yPos = 0; // North/South
    this.xPos = 0; // West/East
    this.direction = EAST;
  }

  print() {
    console.log({ xPos: this.xPos, yPos: this.yPos, direction: this.direction });
  }

  north(value) {
    this.yPos += value;
  }

  south(value) {
    this.yPos -= value;
  }

  east(value) {
    this.xPos += value;
  }

  west(value) {
    this.xPos -= value;
  }

  left(value) {
    let newValue = (this.direction - value);
    if (newValue < 0) {
      newValue = 360 + newValue;
    }
    this.direction = newValue;
  }

  right(value) {
    let newValue = (this.direction + value);
    if (newValue >= 360) {
      newValue = newValue % 360;
    }
    this.direction = newValue;
  }

  forward(value) {
    switch(this.direction) {
      case NORTH:
        this.north(value);
        break;
      case SOUTH:
        this.south(value);
        break;
      case WEST:
        this.west(value);
        break;
      case EAST:
        this.east(value);
        break;
      default:
        console.log('I DON\'T KNOW WHAT DIRECTION TO GO!');
        console.log({ value, direction: this.direction })
        break;
    }
  }

  manhattanDist() {
    return Math.abs(this.xPos) + Math.abs(this.yPos);
  }
}

fileStream
  .on('data', (chunk) => {
    // Split on blank line
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    const ship = new Ship();
    for (let i = 0; i < data.length - 1; i++) {
      const line = data[i];
      const instruction = line[0];
      const value = parseInt(line.substring(1));
      switch(instruction) {
        case 'N':
          ship.north(value);
          break;
        case 'S':
          ship.south(value);
          break;
        case 'E':
          ship.east(value);
          break;
        case 'W':
          ship.west(value);
          break;
        case 'L':
          ship.left(value);
          break;
        case 'R':
          ship.right(value);
          break;
        case 'F':
          ship.forward(value);
          break;
      }
    }
    result = ship.manhattanDist();
    console.log({ result });
}).read();
