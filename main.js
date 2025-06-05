const prompt = require("prompt-sync")({ sigint: true });
// Input require

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

// Class Definition
class Field {
  constructor(field) {
    this._field = field;
    this.playerRow = 0;
    this.playerCol = 0;
    this.isDead = false;
    this.hasWon = false;
    this._field[0][0] = '*';
  }

  // Print method
  print() {
    console.log('\n'.repeat(30));
    for (let row of this._field) {
      console.log(row.join(""));
    }
  }

  print2() {
    for (let row of this._field) {
      console.log(row.join(""));
    }
  }

  static generateField(height, width, percentage) {
    // Create empty field array.
    let field = [];
    // Fill with field characters.
    for (let row = 0; row <= height - 1; row++) {
      let newRow = Array(width).fill(fieldCharacter);
      field.push(newRow);
    }

    // Randomly place hat (not at [0][0]).
    let hatRow, hatCol;
    do {
      hatRow = Math.floor(Math.random() * height);
      hatCol = Math.floor(Math.random() * width);
    } while (hatRow === 0 && hatCol === 0);
    field[hatRow][hatCol] = "^";

    // Randomly place holes based on percentage.
    let numberHoles = Math.floor(percentage * (height * width));
    let holeRow, holeCol;

    for (let i = 0; i < numberHoles; i++) {
      let validSpot = false;

      while (!validSpot) {
        holeRow = Math.floor(Math.random() * height);
        holeCol = Math.floor(Math.random() * width);

        if (
          !(holeRow === 0 && holeCol === 0) &&
          !(holeRow === hatRow && holeCol === hatCol) &&
          field[holeRow][holeCol] !== "O"
        ) {
          field[holeRow][holeCol] = "O";
          validSpot = true;
        }
      }
    }
    // Return the field array.
    return field;
  }

  playGame() {
    
    while (!this.isDead && !this.hasWon) {
      
      // Input Player direction
      const direction = prompt("Which way? ( u/ d / l / r ): ");

      // Movement
      switch (direction) {
        case "u": {
          this.playerRow -= 1;
          
          break;
        }
        case "d": {
          this.playerRow += 1;
          //this._field[this.playerRow][this.playerCol] = "*";
          break;
        }
        case "l": {
          this.playerCol -= 1;
          //this._field[this.playerRow][this.playerCol] = "*";
          break;
        }
        case "r": {
          this.playerCol += 1;
          //this._field[this.playerRow][this.playerCol] = "*";
          break;
        }
      }

      // Check for the player out of bounds
      if (
        this.playerRow < 0 ||
        this.playerRow >= this._field.length ||
        this.playerCol < 0 ||
        this.playerCol >= this._field[0].length
      ) {
        this.isDead = true;
        console.log("You exited the field");
      }

      // Check for player falling on a Hole
      if (this._field[this.playerRow][this.playerCol] === "O") {
        this.isDead = true;
        console.log("You fell on a Hole");
      }

      // Check if player found the Hat.
      if (this._field[this.playerRow][this.playerCol] === "^") {
        this.hasWon = true;
        console.log("You won the Game!!!");
      }

      if (!this.isDead) {
          this._field[this.playerRow][this.playerCol] = "*";
          this.print();
      }
      
    }
  }
}

// Game Setup
const myField = Field.generateField(9, 5, 0.2);
const game = new Field(myField);
game.print();
game.playGame();
