"use strict";

const fs = require("fs");
const fileStream = fs.createReadStream("./input.txt");
let data = [];
let result = 0;

const ROCK = "🪨";
const PAPER = "📄";
const SCISSORS = "✂️";

const OPPONENT_ROCK = "A";
const OPPONENT_PAPER = "B";
const OPPONENT_SCISSORS = "C";
const PLAYER_ROCK = "X";
const PLAYER_PAPER = "Y";
const PLAYER_SCISSORS = "Z";

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    let rounds = [];
    for (let i = 0; i < data.length; i++) {
      rounds.push(data[i]);
    }
    const roundScores = rounds.map((round) => {
      const choices = round.split(" ").map((choice) => {
        switch (choice) {
          case OPPONENT_ROCK:
          case PLAYER_ROCK:
            return ROCK;
          case OPPONENT_PAPER:
          case PLAYER_PAPER:
            return PAPER;
          case OPPONENT_SCISSORS:
          case PLAYER_SCISSORS:
            return SCISSORS;
          default:
            console.log("huh?");
        }
      });
      let playerScore = 0;
      let roundResult = 0;
      const opponent = choices[0];
      const player = choices[1];
      // Calculate player score and round result
      switch (player) {
        case ROCK:
          playerScore = 1;
          if (opponent === ROCK) {
            roundResult = 3; // Draw
          }
          if (opponent === SCISSORS) {
            roundResult = 6; // Player wins!
          }
          break;
        case PAPER:
          playerScore = 2;
          if (opponent === PAPER) {
            roundResult = 3; // Draw
          }
          if (opponent === ROCK) {
            roundResult = 6; // Player wins!
          }
          break;
        case SCISSORS:
          playerScore = 3;
          if (opponent === SCISSORS) {
            roundResult = 3; // Draw
          }
          if (opponent === PAPER) {
            roundResult = 6; // Player wins!
          }
          break;
      }

      return playerScore + roundResult;
    });
    const sum = roundScores.reduce((acc, cur) => acc + cur, 0);
    console.log({ sum });
  })
  .read();
