"use strict";

const fs = require("fs");
const fileStream = fs.createReadStream("./input.txt");
let data = [];

const ROCK = "🪨";
const PAPER = "📄";
const SCISSORS = "✂️";

const OPPONENT_ROCK = "A";
const OPPONENT_PAPER = "B";
const OPPONENT_SCISSORS = "C";
const PLAYER_LOSE = "X";
const DRAW = "Y";
const PLAYER_WIN = "Z";

const opponentChoice = (thrown) => {
  switch (thrown) {
    case OPPONENT_ROCK:
      return ROCK;
    case OPPONENT_PAPER:
      return PAPER;
    case OPPONENT_SCISSORS:
      return SCISSORS;
    default:
      console.log("huh?");
  }
};

const whatBeats = (thrown) => {
  switch (thrown) {
    case ROCK:
      return PAPER;
    case PAPER:
      return SCISSORS;
    case SCISSORS:
      return ROCK;
    default:
      console.log("huh?");
  }
};

const whatLoses = (thrown) => {
  switch (thrown) {
    case ROCK:
      return SCISSORS;
    case PAPER:
      return ROCK;
    case SCISSORS:
      return PAPER;
    default:
      console.log("huh?");
  }
};

const playerScore = (thrown) => {
  switch (thrown) {
    case ROCK:
      return 1;
    case PAPER:
      return 2;
    case SCISSORS:
      return 3;
    default:
      return 0;
  }
};

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
      let roundResult = 0;
      const choices = round.split(" ");
      const opponent = opponentChoice(choices[0]);
      const gameResult = choices[1];
      let playerPlayed;
      switch (gameResult) {
        case DRAW:
          roundResult = 3; // Draw
          playerPlayed = opponent; // Same
          break;
        case PLAYER_WIN:
          roundResult = 6;
          playerPlayed = whatBeats(opponent); // Player did the winning move
          break;
        case PLAYER_LOSE:
          roundResult = 0;
          playerPlayed = whatLoses(opponent); // Player did the winning move
          break;
      }
      const score = playerScore(playerPlayed);
      return score + roundResult;
    });
    const sum = roundScores.reduce((acc, cur) => acc + cur, 0);
    console.log({ sum });
  })
  .read();
