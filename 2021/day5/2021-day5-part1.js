"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day5-input.txt");
let data = [];
let result = 0;

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    // Process input
    const lines = [];
    const pointsMap = {};

    for (let i = 0; i < data.length; i++) {
      const coords = data[i].split(" -> ");
      const begin = coords[0].split(",").map((c) => parseInt(c, 10));
      const end = coords[1].split(",").map((c) => parseInt(c, 10));
      const isVertical = begin[0] === end[0];
      const isHorizontal = begin[1] === end[1];
      if (isVertical || isHorizontal) {
        lines.push([begin, end]);
      }
    }
    for (let i = 0; i < lines.length; i++) {
      const beginX = lines[i][0][0];
      const beginY = lines[i][0][1];
      const endX = lines[i][1][0];
      const endY = lines[i][1][1];
      let linePoints = [];
      if (beginX === endX) {
        // Line is horizontal
        const sortedYs = [beginY, endY].sort((a, b) => a - b);
        const yValues = _.range(sortedYs[0], sortedYs[1] + 1);
        // console.log(yValues);
        const xValue = beginX;
        linePoints = yValues.map((yv) => `${xValue},${yv}`);
        // console.log(linePoints);
      } else if (beginY === endY) {
        // Line is vertical
        const sortedXs = [beginX, endX].sort((a, b) => a - b);
        const xValues = _.range(sortedXs[0], sortedXs[1] + 1);
        // console.log(xValues);
        const yValue = beginY;
        linePoints = xValues.map((xv) => `${xv},${yValue}`);
        // console.log(linePoints);
      }
      for (let j = 0; j < linePoints.length; j++) {
        // Put linePoints in map
        const linePoint = linePoints[j];
        // console.log({ linePoint });
        if (pointsMap[linePoint]) {
          pointsMap[linePoint] += 1;
        } else {
          pointsMap[linePoint] = 1;
        }
      }
    }
    Object.keys(pointsMap);
    const atLeastTwo = _.flow([
      Object.entries,
      (arr) => arr.filter(([key, value]) => value >= 2),
      Object.fromEntries,
    ])(pointsMap);

    // console.log({ atLeastTwo });
    result = Object.keys(atLeastTwo).length;
    console.log({ result });
  })
  .read();
