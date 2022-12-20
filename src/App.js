import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Notification from "./components/Notification";
import PopUp from "./components/PopUp";
import Hint from "./components/Hint";

import { showNotification as show } from "./helpers/helpers";

// const words = ["application", "programming", "interface", "wizard"];

//let selectedWord = words[Math.floor(Math.random() * words.length)];

var randomWords = require("random-words");
let selectedWord = randomWords();
// let HintLetters = selectedWord;
console.log(selectedWord);
let getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
console.log(selectedWord.length);
console.log(selectedWord.length / 3);

let max,
  min = 0,
  n = Math.ceil(selectedWord.length / 3),
  randIndex = [0];
console.log(n);
for (let i = 0; i < n; i++) {
  if (i === n - 1) {
    max = selectedWord.length - 1;
  } else {
    max = min + 3;
  }
  randIndex[i] = getRandomInt(min, max);
  console.log(randIndex.at(i));

  min += 3;
}
function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, keyCode } = event;
      if (playable) {
        if (keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();

          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setCorrectLetters((currentLetters) => [
                ...currentLetters,
                letter,
              ]);
            } else {
              show(setShowNotification);
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
            } else {
              show(setShowNotification);
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [correctLetters, wrongLetters, playable]);

  const playAgain = () => {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    randomWords = require("random-words");
    selectedWord = randomWords();
    console.log(selectedWord);
  };

  return (
    <>
      <Header />
      <Hint selectedWord={selectedWord} randIndex={randIndex} />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <PopUp
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
