"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day17-input.txt");
let rangeValues = {};
let result = 0;

class OceanTrench {
  constructor(ranges) {
    this.minX = ranges.x[0];
    this.maxX = ranges.x[1];
    this.minY = ranges.y[0];
    this.maxY = ranges.y[1];
  }

  testRun(initialX, initialY) {
    let probeX = 0;
    let probeY = 0;
    let xVelocity = initialX;
    let yVelocity = initialY;
    let finished = false;
    let path = [[0, 0]];
    let hits = [];
    let steps = 0;
    while (!finished) {
      steps += 1;
      // Move probe according to velocity
      probeX += xVelocity;
      probeY += yVelocity;
      // Add to path
      // console.log("Probe X:", probeX);
      // console.log("Probe Y:", probeY);
      path.push([probeX, probeY]);
      // Check new position for a hit
      const hit = this.checkPoint(probeX, probeY);
      if (hit) hits.push([probeX, probeY]);
      // Adjust velocity to account for gravity and drag
      if (xVelocity > 0) {
        xVelocity -= 1;
      } else if (xVelocity < 0) {
        xVelocity += 1;
      }
      yVelocity -= 1;
      // console.log("x velocity", xVelocity);
      // console.log("y velocity", yVelocity);
      // If we are out of range, we're finished
      if (xVelocity === 0 && probeY < this.minY) {
        finished = true;
      }
    }
    // this.printRun(path);
    // console.log({ hits });
    return {
      hit: hits.length > 0,
      lastPoint: path[path.length - 1],
      maxYPosition: Math.max(...path.map((p) => p[1])),
      maxXPosition: Math.max(...path.map((p) => p[0])),
    };
  }

  print() {
    console.log("x ranges: ", this.minX, this.maxX);
    console.log("y ranges: ", this.minY, this.maxY);
  }

  printRun(path) {
    console.log({ path });
    const yValues = [...path.map((p) => p[1]), this.minY, this.maxY];
    const firstYRow = Math.max(...yValues);
    const lastYRow = Math.min(...yValues);
    const xValues = [...path.map((p) => p[0]), this.minX, this.maxX];
    const firstXCol = Math.min(...xValues);
    const lastXCol = Math.max(...xValues);
    let row = firstYRow;
    while (row >= lastYRow) {
      let rowToPrint = [];
      let col = firstXCol;
      while (col <= lastXCol) {
        if (path.find((p) => p[0] === col && p[1] === row)) {
          // This is in our path
          rowToPrint.push("#");
        } else if (this.checkPoint(col, row)) {
          // We are in the target
          rowToPrint.push("T");
        } else {
          // Neither
          rowToPrint.push(".");
        }
        col += 1;
      }
      row -= 1;
      console.log(rowToPrint.join(""));
    }
  }

  checkPoint(x, y) {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
  }

  findPaths() {
    const absY = Math.abs(this.minY);
    let bestY = -absY;
    let bestCoords = [];
    // Min X is triangular floor
    let x = Math.floor(Math.sqrt(this.minX * 2));
    while (x < this.maxX) {
      for (let y = -absY; y <= absY; y++) {
        const run = this.testRun(x, y);
        if (run.hit && run.maxYPosition > bestY) {
          bestY = run.maxYPosition;
          bestCoords = [x, y];
        }
      }
      x += 1;
    }
    return { coords: bestCoords, maximumY: bestY };
  }
}

fileStream
  .on("data", (chunk) => {
    const input = chunk.toString().split(" ");
    const xInput = input[2];
    const yInput = input[3];
    rangeValues["x"] = xInput.split("..").map((v, i) => {
      if (i === 0) {
        return parseInt(v.split("=")[1], 10);
      } else {
        return parseInt(v.split(",")[0], 10);
      }
    });
    rangeValues["y"] = yInput.split("..").map((v, i) => {
      if (i === 0) {
        return parseInt(v.split("=")[1], 10);
      } else {
        return parseInt(v, 10);
      }
    });
  })
  .on("end", function () {
    console.log({ rangeValues });
    const ocean = new OceanTrench(rangeValues);
    ocean.print();
    const run = ocean.findPaths();
    console.log({ run });
    result = run.maximumY;
    console.log({ result });
  })
  .read();
