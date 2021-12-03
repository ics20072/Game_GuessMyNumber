"use strict";

//This is a function that checks if the current score we dobe is higher than the highscore
const checkForHighscore = function () {
  if (score > highscore) {
    highscore = score;
    document.querySelector(".highscore").textContent = highscore;
  }
};
//We generate a random number from 1 to 20
const generateSecretNumber = () => Math.trunc(Math.random() * 20) + 1;
//The message that appears on the right and informs about the progress of the game
const displayMessage = (message) => document.querySelector(".message").textContent = message;
const setInputBorderColor = (color) => document.querySelector(".guess").style.borderColor = color;
const displayTheCurrentScore = (score) => document.querySelector(".score").textContent = score;

let score = 20; //Initial the maximum score (we can't have better score than 20)
let theSecretNumber = generateSecretNumber();
let highscore = 0;
let isThisTheNumber = -1; //If -1 then it means that the game is not over yet

document.querySelector(".check").addEventListener("click", function () {
    const inputValue = Number(document.querySelector(".guess").value);
    //Check if the field entered by the user is empty
    if (isThisTheNumber === -1) {
      if (!inputValue) {
        displayMessage("❌ No number selected!");
        setInputBorderColor("red");
      } else if (inputValue === theSecretNumber) {
        displayMessage("🎯💯 Correct Number!");
        document.querySelector(".number").textContent = theSecretNumber;
        setInputBorderColor("white");
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";
        isThisTheNumber = inputValue; //Changing the value from -1 to another, means that the player will only be able to play the game again.
        checkForHighscore();
      } else if (inputValue !== theSecretNumber) {
        if (score > 1) {
          displayMessage(inputValue > theSecretNumber ? "📈 Too high!" : "📉 Too low!"); 
          setInputBorderColor("white");
          score--;
          displayTheCurrentScore(score);
        } else {
          displayMessage("😥 You lost the game!");
          displayTheCurrentScore(0);
          isThisTheNumber = 0;
        }
      }
    }else {
      alert("Game Over! Click 'Αgain!' to try for a better score");
    }
}, false);

//To reset the Game! We only keep the highscore
document.querySelector(".again").addEventListener("click", function () {
    score = 20;
    theSecretNumber = generateSecretNumber();
    document.querySelector(".number").textContent = "?";
    displayMessage("Start guessing...");
    document.querySelector(".guess").value = "";
    displayTheCurrentScore(score);
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
    setInputBorderColor("white");
    isThisTheNumber = -1; //We have to give him the opportunity again to be able to check his input to play again
}, false);
