"use strict";

const fs = require("fs");
const _ = require("lodash");
const fileStream = fs.createReadStream("./2021-day21-input.txt");
let result = 0;
let data = [];

class DeterministicDie {
  constructor() {
    this.totalRolls = 0;
    this.currentValue = 0;
  }

  roll() {
    this.totalRolls += 1;
    if (this.currentValue === 100) {
      this.currentValue = 1;
    } else {
      this.currentValue += 1;
    }
    return this.currentValue;
  }
}

class Pawn {
  constructor(playerNo, startingPosition, goingFirst, die) {
    this.playerNo = playerNo;
    this.position = startingPosition;
    this.score = 0;
    this.myTurn = goingFirst;
    this.die = die;
    this.isWinner = false;
  }
  turn() {
    if (this.myTurn) {
      // It is my turn!
      // Roll dice 3 times
      const roll1 = this.die.roll();
      const roll2 = this.die.roll();
      const roll3 = this.die.roll();
      // Move spaces
      const spacesToMove = roll1 + roll2 + roll3;
      _.times(spacesToMove, () => {
        if (this.position === 10) {
          this.position = 1;
        } else {
          this.position += 1;
        }
      });
      // Add our new position to our score
      this.score += this.position;
      if (this.score >= 1000) {
        this.isWinner = true;
      }
      // Not our turn anymore
      this.myTurn = false;
      console.log(
        `Player ${
          this.playerNo
        } rolls ${roll1}+${roll2}+${roll3} and moves to space ${
          this.position
        } for a ${this.isWinner ? "final" : "total"} score of ${this.score}`
      );
    } else {
      // Not my turn. It will be next time, though.
      this.myTurn = true;
    }
  }
}

class Game {
  players = [];
  constructor(player1start, player2start) {
    this.die = new DeterministicDie();
    this.players.push(new Pawn(1, player1start, true, this.die));
    this.players.push(new Pawn(2, player2start, false, this.die));
  }
  isWon() {
    return this.players.map((p) => p.isWinner).filter((w) => w).length > 0;
  }
  start() {
    while (!this.isWon()) {
      this.players.forEach((p) => p.turn());
    }
  }
  output() {
    const loserScore = this.players.filter((p) => !p.isWinner)[0].score;
    const totalRolls = this.die.totalRolls;
    console.log(`Loser score: ${loserScore}`);
    console.log(`Total rolls: ${totalRolls}`);
    return loserScore * totalRolls;
  }
}

fileStream
  .on("data", (chunk) => {
    data = chunk.toString().split("\n");
  })
  .on("end", function () {
    const startingPositions = data.map((d) => parseInt(d.split(" ")[4], 10));
    const game = new Game(startingPositions[0], startingPositions[1]);
    game.start();
    result = game.output();
    console.log({ result });
  })
  .read();
