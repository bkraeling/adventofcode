"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day19-test.txt");
let result = 0;
let data = [];
let scanners = [];
const OVERLAPS = 3;

function testScannersForOverlap(scanner1, scanner2) {
  // Position scanner 2 according to scanner 1 and the first point
  const firstPoint = scanner1.reports[0];
  let pointMatches = {};
  for (let i = 0; i < scanner2.reports.length; i++) {
    const secondPoint = scanner2.reports[i];
  }
}

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n\n");
  })
  .on("end", function () {
    // Process data
    for (let i = 0; i < data.length; i++) {
      const scannerData = data[i].split("\n");
      const scannerNo = parseInt(scannerData.shift().split(" ")[2], 10);
      const scannerReports = scannerData.map((r) => {
        const reportParts = r.split(",");
        return [parseInt(reportParts[0], 10), parseInt(reportParts[1], 10)];
      });
      scanners.push({ number: scannerNo, reports: scannerReports });
    }
    testScannersForOverlap(scanners[0], scanners[1]);
    console.log({ result });
  })
  .read();
