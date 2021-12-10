"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day6-input.txt");
let data = [];
let result = 0;
const DAYS = 256;

fileStream
  .on("data", (chunk) => {
    data = chunk
      .toString()
      .split(",")
      .map((d) => parseInt(d, 10));
  })
  .on("end", function () {
    // Create map
    let dataMap = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
    };
    for (let i = 0; i < data.length; i++) {
      dataMap[data[i]] += 1;
    }
    console.log(dataMap);
    for (let day = 0; day < DAYS; day++) {
      const newMap = {
        0: dataMap["1"],
        1: dataMap["2"],
        2: dataMap["3"],
        3: dataMap["4"],
        4: dataMap["5"],
        5: dataMap["6"],
        6: dataMap["7"] + dataMap["0"],
        7: dataMap["8"],
        8: dataMap["0"],
      };
      dataMap = newMap;
    }
    result = _.sum(Object.values(dataMap));
    console.log(dataMap);
    console.log({ result });
  })
  .read();
