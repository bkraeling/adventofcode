"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day12-input.txt");
let data = [];
let result = 0;

class CaveSystem {
  constructor(caveCount) {
    this.caveCount = caveCount;
    this.edges = new Map();
  }

  addCave(c) {
    this.edges.set(c, []);
  }

  addEdge(start, end) {
    this.edges.get(start).push(end);
    this.edges.get(end).push(start);
  }

  print() {
    const keys = this.edges.keys();
    for (let i of keys) {
      const get_values = this.edges.get(i);
      let listString = "";
      for (var j of get_values) {
        listString += j + " ";
      }
      console.log(i + " -> " + listString);
    }
  }

  validatePath(path) {
    // Filter out big caves
    const smallCaves = path.filter((cave) => _.toUpper(cave) !== cave);
    // If we don't have any duplicates, this is a valid path!
    return smallCaves.length === _.uniq(smallCaves).length;
  }

  traverse() {
    let pathsToComplete = [["start"]];
    const completePaths = [];
    while (pathsToComplete.length > 0) {
      const path = pathsToComplete.shift();
      // console.log({ path });
      const neighbors = this.edges.get(_.last(path));
      for (let j = 0; j < neighbors.length; j++) {
        const newPath = [...path, neighbors[j]];
        const pathIsValid = this.validatePath(newPath);
        // console.log({ newPath, pathIsValid });
        if (pathIsValid) {
          // Are we at an end?
          if (neighbors[j] === "end") {
            // console.log("Path found!", newPath);
            completePaths.push(newPath);
          } else {
            pathsToComplete.push(newPath);
          }
        }
      }
    }
    console.log(completePaths);
    return completePaths.length;
  }

  // bfs(v)
  // dfs(v)
}

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    // Process vertices
    const caves = [];
    for (let i = 0; i < data.length; i++) {
      const twoCaves = data[i].split("-");
      caves.push(twoCaves[0]);
      caves.push(twoCaves[1]);
    }
    const uniqCaves = _.uniq(caves);
    const caveSystem = new CaveSystem(uniqCaves.length);
    // Add caves
    for (let i = 0; i < uniqCaves.length; i++) {
      caveSystem.addCave(uniqCaves[i]);
    }
    // Add edges
    for (let i = 0; i < data.length; i++) {
      const edgeParts = data[i].split("-");
      caveSystem.addEdge(edgeParts[0], edgeParts[1]);
    }
    caveSystem.print();
    result = caveSystem.traverse();
    console.log({ result });
  })
  .read();
