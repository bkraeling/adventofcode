"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day21-test.txt");
let result = 0;
let data = [];

class GameTree {
  constructor(scores, positions, turnPlayer) {
    this.player1Score = scores[0];
    this.player2Score = scores[1];
    this.player1Position = positions[0];
    this.player2Position = positions[1];
    this.turnPlayer = turnPlayer;
  }
  roll() {
    let gameResults = { 1: 0, 2: 0 };
    if (this.turnPlayer === 1) {
      // Player 1 rolls
      const endPositions = [
        this.player1Position + 1,
        this.player1Position + 2,
        this.player1Position + 3,
      ].map((p) => (p > 10 ? p - 10 : p));
      for (let i = 1; i <= 3; i++) {
        _.times(i, () => {
          if (this.player1Position === 10) {
            this.player1Position = 1;
          } else {
            this.player1Position += 1;
          }
        });
        // Add our new position to our score
        this.player1Score += this.player1Position;
        if (this.player1Score >= 21) {
          console.log("Player 1 wins!");
          gameResults["1"] += 1;
        } else {
          console.log("Player 1 wins!");
          const newTree = new GameTree(
            [this.player1Score, this.player2Score],
            [this.player1Position, this.player2Position],
            2
          );
          const rollResult = newTree.roll();
          gameResults["1"] += rollResult["1"];
          gameResults["2"] += rollResult["2"];
        }
      }
    } else {
      // Player 2 rolls
      for (let i = 1; i <= 3; i++) {
        _.times(i, () => {
          if (this.player2Position === 10) {
            this.player2Position = 1;
          } else {
            this.player2Position += 1;
          }
        });
        // Add our new position to our score
        this.player2Score += this.player2Position;
        if (this.player2Score >= 21) {
          gameResult["2"] += 1;
        } else {
          const newTree = new GameTree(
            [this.player1Score, this.player2Score],
            [this.player1Position, this.player2Position],
            1
          );
          const rollResult = newTree.roll();
          gameResult["1"] += rollResult["1"];
          gameResult["2"] += rollResult["2"];
        }
      }
    }
    return gameResults;
  }
}

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    const startingPositions = data.map((d) => parseInt(d.split(" ")[4], 10));
    const game = new GameTree([0, 0], [startingPositions], 1);
    result = game.roll();
    console.log({ result });
  })
  .read();
