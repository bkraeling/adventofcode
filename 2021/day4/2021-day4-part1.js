"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day4-input.txt");
let data = [];
let score = 0;
let calls = [];
let boards = [];

function removeCallFromBoard(board, call) {
  for (let j = 0; j < board.length; j++) {
    board[j] = board[j].filter((z) => z !== call);
  }
  return board;
}

function isBoardWinner(board) {
  const rowCounts = board.map((b) => b.length);
  const zeroRowCounts = rowCounts.filter((rc) => rc === 0);
  return !!zeroRowCounts.length;
}

function calculateScore(board, call) {
  const sum = _.sum(_.flatten(board.slice(0, 5)).map((c) => parseInt(c, 10)));
  return sum * parseInt(call, 10);
}

fileStream
  .on("data", (chunk) => {
    // Split on each double line
    data = chunk.toString().split("\n\n");
  })
  .on("end", function () {
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        calls = data[i].split(",");
      } else {
        const all = _.compact(
          _.flattenDeep(data[i].split("\n").map((r) => r.split(" ")))
        );
        const rows = [
          all.slice(0, 5),
          all.slice(5, 10),
          all.slice(10, 15),
          all.slice(15, 20),
          all.slice(20, 25),
        ];
        let columns = [[], [], [], [], []];
        for (let j = 0; j < 25; j++) {
          columns[j % 5].push(all[j]);
        }
        const board = [...rows, ...columns];
        boards.push(board);
      }
    }
    let winner = false;
    let currentCall = calls[0];
    while (!winner) {
      console.log("Checking: ", currentCall);
      for (let i = 0; i < boards.length; i++) {
        console.log("Removing ", currentCall, " from board ", i);
        boards[i] = removeCallFromBoard(boards[i], currentCall);
        const win = isBoardWinner(boards[i]);
        if (win) {
          score = calculateScore(boards[i], currentCall);
          winner = true;
          break;
        }
      }
      currentCall = calls.shift();
    }
    console.log({ score });
  })
  .read();
