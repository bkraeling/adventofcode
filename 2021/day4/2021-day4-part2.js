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
  console.log(board);
  const rowCounts = board.map((b) => b.length);
  console.log(rowCounts);
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
    let currentCall = calls[0];
    let boardsThatWon = [];
    while (boards.length > 0) {
      console.log("Checking:", currentCall);
      for (let i = 0; i < boards.length; i++) {
        console.log("Removing", currentCall, "from board", i);
        boards[i] = removeCallFromBoard(boards[i], currentCall);
        const win = isBoardWinner(boards[i]);
        if (win) {
          boardsThatWon.push(i);
        }
      }
      if (boardsThatWon.length > 0) {
        for (let j = boardsThatWon.length - 1; j >= 0; j--) {
          score = calculateScore(boards[boardsThatWon[j]], currentCall);
          console.log("Removing board", boardsThatWon[j]);
          boards.splice(boardsThatWon[j], 1);
        }
        boardsThatWon = [];
      }
      currentCall = calls.shift();
    }
    console.log({ score });
  })
  .read();
