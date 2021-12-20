"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day18-input.txt");
let result = 0;
let data = [];

function arrayize(input) {
  const inputArr = input.split("");

  let commaIndex = -1;
  let bracketLevel = 0;
  for (let i = 1; i < inputArr.length - 1; i++) {
    const nextChar = inputArr[i];
    switch (nextChar) {
      case "[":
        bracketLevel += 1;
        break;
      case "]":
        bracketLevel -= 1;
        break;
      case ",":
        if (bracketLevel === 0) {
          // This is our split point
          commaIndex = i;
        }
        break;
      default:
        // This is a number, so don't split on it
        break;
    }
  }
  let left = input.slice(1, commaIndex);
  let right = input.slice(commaIndex + 1, input.length - 1);
  if (left.length === 1) {
    left = parseInt(left, 10);
  } else {
    left = arrayize(left);
  }
  if (right.length === 1) {
    right = parseInt(right, 10);
  } else {
    right = arrayize(right);
  }
  return [left, right];
}

class Leaf {
  constructor(value, level, direction, parent) {
    this.value = value;
    this.level = level;
    this.parent = parent;
    this.direction = direction;
  }
  print() {
    console.log(`${" ".repeat(this.level)}Leaf: ${this.value}`);
  }
  toString() {
    return `${this.value}`;
  }
  isLeaf() {
    return true;
  }
  isLeafPair() {
    return false;
  }
  getPairs() {
    return [];
  }
  isSplittable() {
    return this.value > 9;
  }
  getValue() {
    return this.value;
  }
  getLeftValue() {
    return this;
  }
  getRightValue() {
    return this;
  }
  addValue(value) {
    this.value += value;
  }
  reduce() {
    return false;
  }
  isReduceable() {
    return false;
  }
  split() {
    const leftLeaf = Math.floor(this.value / 2);
    const rightLeaf = Math.ceil(this.value / 2);
    const newPair = new BinaryTree(
      [leftLeaf, rightLeaf],
      this.level,
      this.direction,
      this.parent
    );
    if (this.direction === "left") {
      this.parent.left = newPair;
      if (this.level > 4) {
        this.parent.left.explode();
      }
    } else {
      if (!this.parent) console.log(this);
      this.parent.right = newPair;
      if (this.level > 4) {
        this.parent.right.explode();
      }
    }
  }
}

class BinaryTree {
  left = undefined;
  right = undefined;
  direction = undefined;
  constructor(input, level, direction, parent) {
    if (typeof input[0] === "number") {
      this.left = new Leaf(input[0], level + 1, "left", this);
    } else {
      this.left = new BinaryTree(input[0], level + 1, "left", this);
    }
    if (typeof input[1] === "number") {
      this.right = new Leaf(input[1], level + 1, "right", this);
    } else {
      this.right = new BinaryTree(input[1], level + 1, "right", this);
    }
    this.level = level;
    if (parent) {
      this.parent = parent;
    }
    if (direction) {
      this.direction = direction;
    }
  }

  print() {
    console.log(`${" ".repeat(this.level)}Left:`);
    this.left.print();
    console.log(`${" ".repeat(this.level)}Right:`);
    this.right.print();
  }

  toString() {
    return `[${this.left.toString()},${this.right.toString()}]`;
  }

  getLeftNeighbor() {
    let leftNeighbor = null;
    if (this.parent) {
      if (this.direction === "right") {
        if (this.parent.left.isLeaf()) {
          leftNeighbor = this.parent.left;
        } else {
          leftNeighbor = this.parent.left.getRightmostLeaf();
        }
      } else {
        leftNeighbor = this.parent.getLeftNeighbor();
      }
    }
    return leftNeighbor;
  }

  getRightNeighbor() {
    let rightNeighbor = null;
    if (this.parent) {
      if (this.direction === "left") {
        if (this.parent.right.isLeaf()) {
          rightNeighbor = this.parent.right;
        } else {
          rightNeighbor = this.parent.right.getLeftmostLeaf();
        }
      } else {
        rightNeighbor = this.parent.getRightNeighbor();
      }
    }
    return rightNeighbor;
  }

  getLeftmostLeaf() {
    if (this.left.isLeaf()) {
      return this.left;
    }
    return this.left.getLeftmostLeaf();
  }
  getRightmostLeaf() {
    if (this.right.isLeaf()) {
      return this.right;
    }
    return this.right.getRightmostLeaf();
  }

  isLeaf() {
    return false;
  }

  isLeafPair() {
    return this.left.isLeaf() && this.right.isLeaf();
  }
  isExplodable() {
    return this.isLeafPair() && this.level >= 4;
  }
  isSplittable() {
    return false;
  }
  isReduceable() {
    if (this.isLeafPair()) {
      return (
        this.isExplodable() ||
        this.left.isSplittable() ||
        this.right.isSplittable()
      );
    } else {
      return this.left.isReduceable() || this.right.isReduceable();
    }
  }

  getNodes() {
    const nodes = [];
    if (this.left.isLeaf()) {
      nodes.push(this.left);
    } else {
      nodes.push(this.left.getNodes());
    }
    if (this.right.isLeaf()) {
      nodes.push(this.right);
    } else {
      nodes.push(this.right.getNodes());
    }
    return _.flattenDeep(nodes);
  }

  getPairs() {
    const pairs = [];
    if (this.left.isLeafPair()) {
      pairs.push(this.left);
    } else {
      pairs.push(this.left.getPairs());
    }
    if (this.right.isLeafPair()) {
      pairs.push(this.right);
    } else {
      pairs.push(this.right.getPairs());
    }

    return _.flattenDeep(pairs);
  }

  explode() {
    const leftNeighbor = this.getLeftNeighbor();
    if (leftNeighbor) {
      leftNeighbor.addValue(this.left.getValue());
    }
    const rightNeighbor = this.getRightNeighbor();
    if (rightNeighbor) {
      rightNeighbor.addValue(this.right.getValue());
    }
    if (this.direction === "left") {
      this.parent.left = new Leaf(0, this.level, this.direction, this.parent);
    } else {
      this.parent.right = new Leaf(0, this.level, this.direction, this.parent);
    }
  }

  getMagnitude() {
    let left = 0;
    let right = 0;
    if (this.left.isLeaf()) {
      left = this.left.getValue();
    } else {
      left = this.left.getMagnitude();
    }
    if (this.right.isLeaf()) {
      right = this.right.getValue();
    } else {
      right = this.right.getMagnitude();
    }
    return 3 * left + 2 * right;
  }
}

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    let final = data[0];
    for (let i = 1; i < data.length; i++) {
      const tree = new BinaryTree(arrayize(`[${final},${data[i]}]`), 0);
      let explodablePairs = tree.getPairs().filter((p) => p.isExplodable());
      let splittableNodes = tree.getNodes().filter((n) => n.isSplittable());
      while (explodablePairs.length > 0 || splittableNodes.length > 0) {
        console.log({
          explodablePairs: explodablePairs.map(
            (ep) => `Left: ${ep.left.getValue()}, Right: ${ep.right.getValue()}`
          ),
        });
        console.log({
          splittableNodes: splittableNodes.map(
            (sn) => `Splittable node: ${sn.getValue()}`
          ),
        });
        if (explodablePairs.length > 0) {
          // Explosion!
          explodablePairs[0].explode();
        } else {
          // Split!
          splittableNodes[0].split();
        }
        console.log(tree.toString());
        explodablePairs = tree.getPairs().filter((p) => p.isExplodable());
        splittableNodes = tree.getNodes().filter((n) => n.isSplittable());
      }
      console.log(tree.toString());
      final = tree.toString();
      result = tree.getMagnitude();
    }
    console.log({ final });
    console.log({ result });
  })
  .read();
