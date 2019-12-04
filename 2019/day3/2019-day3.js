'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2019-day3-input.txt');
let data = [];
let result = 0;

function intersect(a, b) {
  const array1 = a.map(n => n.join(','));
  const array2 = b.map(n => n.join(','));
  console.log("arrays mapped");
  return array1.filter(value => -1 !== array2.indexOf(value)).map(p => p.split(',')).map(d => d.map(e => parseInt(e)));
}

function findSteps(wire1, wire2, point) {
  const array1 = wire1.map(n => n.join(','));
  const array2 = wire2.map(n => n.join(','));
  const index1 = array1.indexOf(point.join(','));
  const index2 = array2.indexOf(point.join(','));
  return index1 + index2 + 2;
}

function manhattanDistances(intersection) {
  return intersection.map(o => Math.abs(o[0]) + Math.abs(o[1]));
}

function traceWirePath(wire) {
  const pathPoints = [];
  let currentPosition = [0, 0];
  for (let i = 0; i < wire.length; i++) {
    const direction = wire[i][0];
    const distance = parseInt(wire[i].substring(1));
    for (let j = 0; j < distance; j++) {
      if (direction === 'U') {
        currentPosition = [currentPosition[0], currentPosition[1] + 1];
      } else if (direction === 'D') {
        currentPosition = [currentPosition[0], currentPosition[1] - 1];
      } else if (direction === 'R') {
        currentPosition = [currentPosition[0] + 1, currentPosition[1]];
      } else if (direction === 'L') {
        currentPosition = [currentPosition[0] - 1, currentPosition[1]];
      }
      pathPoints.push(currentPosition);
    }
  }
  return pathPoints;
}

fileStream
  .on('data', (chunk) => {
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    const wire1 = data[0].split(',');
    const wire2 = data[1].split(',');
    // figure out wire paths for 1 and 2
    console.log("getting wire 1");
    const path1 = traceWirePath(wire1);
    console.log({ wire1: path1.length });
    console.log("getting wire 2");
    const path2 = traceWirePath(wire2);
    console.log({ wire2: path2.length });
    console.log("getting intersection");
    const intersection = intersect(path1, path2);

    console.log({ intersection });
    // console.log("getting distances");
    // const distances = manhattanDistances(intersection);
    // console.log({ intersection });
    console.log("getting steps");
    const steps = intersection.map(i => findSteps(path1, path2, i));
    console.log({ steps });
    console.log({ result: Math.min(...steps) })
}).read();
