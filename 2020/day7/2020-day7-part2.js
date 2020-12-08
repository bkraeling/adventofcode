'use strict';

const fs = require('fs');
const fileStream = fs.createReadStream('./2020-day7-input.txt');
let data = [];
let result = 0;

class ColorBagNode {
  constructor(name) {
    this.name = name;
    this.contains = [];
  }

  addChild(color, quantity) {
    this.contains.push({ color, quantity });
  }
}

class Graph {
  constructor() {
    this.colorNodes = [];
    this.edges = [];
  }

  addColorNode(name) {
    this.colorNodes.push(new ColorBagNode(name));
  }

  getColorNode(name) {
    return this.colorNodes.find(color => color.name === name);
  }

  addEdge(color, child) {
    const colorNode = this.getColorNode(color);
    colorNode.addChild(child.color, child.quantity);
    this.edges.push(`${color} - ${child.quantity} of ${child.color}`);
  }

  print() {
    return this.colorNodes.map(({ name, contains }) => {
      return `${name} => ${contains.map(color => `${color.quantity} ${color.color},`).join(' ')}`;
    }).join('\n')
  }

  dfs(start, target) {
    // console.log("Visiting Node " + this.getColorNode(start).name);
    if (this.getColorNode(start).name === target) {
        // We have found the goal node we we're searching for
        // console.log("Found the node we're looking for!");
        return start;
    }

    // Recurse with all children
    for (var i = 0; i < this.getColorNode(start).contains.length; i++) {
        var result = this.dfs(this.getColorNode(start).contains[i].color, target);
        if (result != null) {
            // We've found the goal node while going down that child
            return result;
        }
    }

    // We've gone through all children and not found the goal node
    // console.log("Went through all children of " + start.value + ", returning to it's parent.");
    return null;
  }

  traverseCount(start) {
    let total = 1;
    const node = this.getColorNode(start);
    node.contains.forEach(c => {
      const count = this.traverseCount(c.color);
      total += count * c.quantity;
    });
    return total;
  }
}

fileStream
  .on('data', (chunk) => {
    // Split on blank line
    data = chunk.toString().split('\n');
  })
  .on('end', function () {
    const graph = new Graph();
    const allColors = [];
    for (let i = 0; i < data.length - 1; i++) {
      const parsed = data[i].split(' bags contain ');
      const mainColor = parsed[0];
      if (!graph.getColorNode(mainColor)) {
        graph.addColorNode(mainColor);
        allColors.push(mainColor);
      }
      parsed[1].slice(0, -1).split(',').forEach(p => {
        const rule = p.slice(0, -4).trim();
        const quantityMatch = rule.match(/^\d+/);
        if (quantityMatch) {
          const quantity = parseInt(quantityMatch[0]);
          const color = rule.match(/[a-z]+ [a-z]+/)[0];

          // Make sure we have a node
          if (!graph.getColorNode(color)) {
            graph.addColorNode(color);
            allColors.push(color);
          }
          graph.addEdge(mainColor, { color, quantity })
        }
      })
    }

    console.log(graph.print());

    result = graph.traverseCount('shiny gold') - 1;
    console.log({ result });
}).read();
