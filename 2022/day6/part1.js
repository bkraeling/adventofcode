"use strict";

const fs = require("fs");
const fileStream = fs.createReadStream("./input.txt");
let data = [];
let result = 0;
const packetLength = 4;

fileStream
  .on("data", (chunk) => {
    data = chunk.toString();
  })
  .on("end", function () {
    for (let i = packetLength - 1; i < data.length; i++) {
      const packet = [];
      for (let j = 0; j < packetLength; j++) {
        packet.push(data[i - j]);
      }
      console.log({ packet });
      const deduped = [...new Set(packet)];
      console.log({ deduped });
      if (deduped.length === packetLength) {
        // All are unique!
        result = i + 1;
        break;
      }
    }
    console.log({ result });
  })
  .read();
