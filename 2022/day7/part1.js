"use strict";

const fs = require("fs");
const fileStream = fs.createReadStream("./input.txt");
let data = [];
let result = 0;
const MAX_SIZE = 100000;

class Directory {
  constructor(name, level, parent) {
    this.contents = [];
    this.name = name;
    this.level = level;
    this.parent = parent;
  }

  setLevel(level) {
    this.level = level;
  }

  print() {
    console.log(`${"  ".repeat(this.level)}- ${this.name} (dir)`);
    this.contents.forEach((content) => content.print());
  }

  addChild(child) {
    this.contents.push(child);
  }

  hasChild(name) {
    return this.contents.map((c) => c.getName()).includes(name);
  }

  getChild(name) {
    return this.contents.find((c) => c.getName() === name);
  }

  getParent() {
    return this.parent;
  }
  getName() {
    return this.name;
  }

  getSize() {
    return this.contents
      .map((c) => c.getSize())
      .reduce((acc, cur) => acc + cur, 0);
  }
  isDirectory() {
    return true;
  }
}

class File {
  constructor(name, size, level, parent) {
    this.name = name;
    this.size = size;
    this.parent = parent;
    this.level = level;
  }

  setLevel(level) {
    this.level = level;
  }

  getName() {
    return this.name;
  }

  print() {
    console.log(
      `${"  ".repeat(this.level)}- ${this.name} (file, size=${this.size})`
    );
  }

  getSize() {
    return this.size;
  }

  isDirectory() {
    return false;
  }
}

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    const root = new Directory("/", 0, null);
    let allFiles = [root];
    let currentLevel = 0;
    let currentDirectory = root;
    let cwd = [];
    data.shift();
    while (data.length > 0) {
      const command = data.shift();
      const commandParts = command.split(" ");
      const instruction = commandParts[1];
      let newDir, file;
      switch (instruction) {
        case "cd":
          newDir = commandParts[2];
          if (newDir === "..") {
            currentDirectory = currentDirectory.getParent();
            cwd.pop();
            currentLevel--;
          } else {
            currentDirectory = currentDirectory.getChild(newDir);
            cwd.push(newDir);
            currentLevel++;
          }
          console.log(`New dir is ${newDir}!`);
          break;
        case "ls":
          while (data[0] && data[0][0] !== "$") {
            file = data.shift();
            let newFile;
            const fileParts = file.split(" ");
            const name = fileParts[1];
            if (fileParts[0] === "dir") {
              // This is a directory
              if (!currentDirectory.getChild(name)) {
                console.log(`Creating new directory ${name}`);
                newFile = new Directory(name, currentLevel, currentDirectory);
              } else {
                console.log(`Directory ${name} already exists!`);
              }
            } else {
              if (!currentDirectory.getChild(name)) {
                console.log(`Creating new file ${name}`);
                newFile = new File(
                  name,
                  parseInt(fileParts[0]),
                  currentLevel,
                  currentDirectory
                );
              } else {
                console.log(`File ${name} already exists!`);
              }
            }
            currentDirectory.addChild(newFile);
            allFiles.push(newFile);
          }
          break;
        default:
          break;
      }

      // console.log(cwd);
    }
    // console.log(root);
    root.print();
    // Get dirs with sizes that are less than 100000
    let dirSum = 0;
    while (allFiles.length > 0) {
      const file = allFiles.shift();
      if (file.isDirectory() && file.getSize() < MAX_SIZE) {
        // console.log(
        //   `Size: ${file.getSize()} Adding ${file.getName()} to the list!`
        // );
        dirSum += file.getSize();
      }
    }
    console.log({ dirSum });
  })
  .read();
