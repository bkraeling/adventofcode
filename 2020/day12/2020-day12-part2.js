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
    this.yPosShip = 0; // North/South
    this.xPosShip = 0; // West/East
    this.yPosWaypoint = 1; // North/South
    this.xPosWaypoint = 10; // West/East
  }

  print() {
    console.log({ xPosShip: this.xPosShip, yPosShip: this.yPosShip, yPosWaypoint: this.yPosWaypoint, xPosWaypoint: this.xPosWaypoint });
  }

  north(value) {
    this.yPosWaypoint += value;
  }

  south(value) {
    this.yPosWaypoint -= value;
  }

  east(value) {
    this.xPosWaypoint += value;
  }

  west(value) {
    this.xPosWaypoint -= value;
  }

  left(value) {
    let numRotationsLeft = value / 90;
    let yPoint = this.yPosWaypoint;
    let xPoint = this.xPosWaypoint;
    while (numRotationsLeft > 0) {
      const xDiff = xPoint - this.xPosShip;
      const yDiff = yPoint - this.yPosShip;
      xPoint = this.xPosShip - yDiff;
      yPoint = this.yPosShip + xDiff;
      numRotationsLeft--;
    }
    // assigning
    this.yPosWaypoint = yPoint;
    this.xPosWaypoint = xPoint;
  }

  right(value) {
    let numRotationsLeft = value / 90;
    let yPoint = this.yPosWaypoint;
    let xPoint = this.xPosWaypoint;
    while (numRotationsLeft > 0) {
      const xDiff = xPoint - this.xPosShip;
      const yDiff = yPoint - this.yPosShip;
      xPoint = this.xPosShip + yDiff;
      yPoint = this.yPosShip - xDiff;
      numRotationsLeft--;
    }
    // assigning
    this.yPosWaypoint = yPoint;
    this.xPosWaypoint = xPoint;
  }

  forward(value) {
    let numMovesLeft = value;
    while (numMovesLeft > 0) {
      // The ship moves to the waypoint
      const xDiff = this.xPosWaypoint - this.xPosShip;
      const yDiff = this.yPosWaypoint - this.yPosShip;
      this.xPosShip = this.xPosWaypoint;
      this.yPosShip = this.yPosWaypoint;
      // Waypoint moves the same as the ship
      this.xPosWaypoint += xDiff;
      this.yPosWaypoint += yDiff;
      numMovesLeft--;
    }
  }

  manhattanDist() {
    return Math.abs(this.xPosShip) + Math.abs(this.yPosShip);
  }
}

fileStream
  .on('data', (chunk) => {
    // Split on blank line
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    const ship = new Ship();
    ship.print();
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
      ship.print();
    }
    result = ship.manhattanDist();
    console.log({ result });
}).read();
