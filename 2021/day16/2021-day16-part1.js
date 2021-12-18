"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day16-input.txt");
let packetData = "";
let result;

const log = (indent, message) => {
  console.log(`${indent}${message}`);
};

const processPackets = ({ packet, numPackets, indent }) => {
  log(indent, "At start");
  log(indent, `Processing packet: ${packet}`);
  if (numPackets) {
    log(indent, `There are ${numPackets} packets in this chunk of packets`);
  } else {
    log(indent, `This is one packet, consisting of ${packet.length} bits`);
  }
  // Initialization
  let packetsLeftToProcess = numPackets || Infinity;
  let packetArray = packet.split("");
  let versionSum = 0;
  let packetLength = 0;

  // Helper functions
  const getNextChunk = (len) => {
    let toOutput = [];
    packetLength += len;
    _.times(len, () => {
      const firstElem = packetArray.shift();
      toOutput.push(firstElem);
    });
    return toOutput.join("");
  };

  const checkDone = () => {
    let done;
    if (numPackets) {
      // If we are processing multiple packets and we have no more packets left to process we are done
      done = packetsLeftToProcess === 0;
    } else {
      done = packetArray.length === 0;
    }
    return done;
  };

  while (!checkDone()) {
    // Add this packet to the version sum
    const version = parseInt(getNextChunk(3), 2).toString(10);
    const typeId = parseInt(getNextChunk(3), 2).toString(10);
    log(indent, `Adding ${parseInt(version, 10)} to version sum`);
    versionSum += parseInt(version, 10);
    log(indent, `Version: ${version}`);
    log(indent, `Type ID: ${typeId}`);
    switch (typeId) {
      case "4":
        // Handle literal
        log(indent, `Type ID 4 - Literal`);
        let foundLast = false;
        let number = "";
        while (!foundLast) {
          const chunk = getNextChunk(5);
          if (chunk[0] === "0") {
            foundLast = true;
          }
          number += chunk.substring(1);
        }
        const literalValue = parseInt(number, 2).toString(10);
        log(indent, `Literal value - ${literalValue}`);
        if (numPackets) {
          packetsLeftToProcess -= 1;
          log(
            indent,
            `Literal finished. ${packetsLeftToProcess} packets left to process.`
          );
        } else {
          log(indent, `Remaining packet is: ${packetArray.join("")}`);
        }
        break;
      default:
        log(indent, `Type ID is not 4 - Subpackets`);
        const lengthTypeId = getNextChunk(1);
        if (lengthTypeId === "0") {
          // Length is a 15-bit number
          const subPacketBitsLeft = parseInt(getNextChunk(15), 2).toString(10);
          log(indent, `Subpacket is number of bits: ${subPacketBitsLeft}`);
          const packetResult = processPackets({
            packet: packetArray.join("").substring(0, subPacketBitsLeft),
            indent: indent + " ",
          });
          _.times(packetResult.length, () => packetArray.shift());
          packetLength += packetResult.length;
          log(indent, `Adding ${packetResult.sum} to version sum`);
          versionSum += packetResult.sum;
          if (numPackets) {
            packetsLeftToProcess -= 1;
            log(
              indent,
              `Literal finished. ${packetsLeftToProcess} packets left to process.`
            );
          } else {
            log(indent, `Remaining packet is: ${packetArray.join("")}`);
          }
        } else {
          // Number of packets is an 11-bit number
          const nextChunkNumber = parseInt(getNextChunk(11), 2).toString(10);
          const numberOfPackets = parseInt(nextChunkNumber, 10);
          log(indent, `Subpacket is number of packets: ${numberOfPackets}`);
          const packetResult = processPackets({
            packet: packetArray.join(""),
            numPackets: numberOfPackets,
            indent: indent + " ",
          });
          _.times(packetResult.length, () => packetArray.shift());
          packetLength += packetResult.length;
          log(indent, `Adding ${packetResult.sum} to version sum`);
          versionSum += packetResult.sum;
          if (numPackets) {
            packetsLeftToProcess -= 1;
            log(
              indent,
              `Literal finished. ${packetsLeftToProcess} packets left to process.`
            );
          } else {
            log(indent, `Remaining packet is: ${packetArray.join("")}`);
          }
        }
        break;
    }
  }

  log(indent, `Done, version sum is ${versionSum}`);
  return { sum: versionSum, length: packetLength };
};

fileStream
  .on("data", (chunk) => {
    packetData = chunk
      .toString()
      .split("")
      .map((h) => {
        return ("0000" + parseInt(h, 16).toString(2)).slice(-4);
      })
      .join("");
  })
  .on("end", function () {
    console.log({ packetData });
    const result = processPackets({
      packet: packetData,
      indent: "",
    });
    console.log({ result });
    // const testPacketInfo = processPackets({
    //   packet: "010100000011001000001000110000011",
    //   numPackets: 3,
    // });
    // console.log({ testPacketInfo });
  })
  .read();
