// css
import "./App.css";
// hooks
import { useState } from "react";
// words
import { wordsList } from "./data/words";
// components
import StartScreen from "./components/StartScreen";
import Playing from "./components/Playing";
import GameOver from "./components/GameOver";

function App() {

  const guessQty = 3

  const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "playing" },
    { id: 3, name: "gameOver" },
  ];

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [pickedCategory, setpickedCategory] = useState("");
  const [pickedWord, setpickedWord] = useState("");
  const [letters, setLetters] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<number>(guessQty);
  let [score, setScore] = useState<number>(0);
  const [words] = useState<Record<string, string[]>>(wordsList);

  interface CategoryWord {
    word: string;
    category: string;
  }

  const pickCategoryWord = (): CategoryWord => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  };

  const startGame = () => {
    const { word, category } = pickCategoryWord();
    let letters = word.split("");

    letters = letters.map((letter) => {
      return letter.toLowerCase();
    });

    setpickedCategory(category);
    setpickedWord(word);
    setLetters(letters);

    setGameStage(stages[1].name);
  };

  const verifyLetter = (letter: string) => {

    const normalized = letter.toLowerCase()

    if (wrongLetters.includes(normalized) || guessedLetters.includes(normalized)) {
      return
    }

    if (letters.includes(normalized)) {
      let actualGuessedLetter = [...guessedLetters, normalized]
      console.log(actualGuessedLetter.length)
      if (actualGuessedLetter.length === letters.length) {
        setScore(score += 100)
        setGameStage(stages[2].name)
      }
      setGuessedLetters(actualGuessedLetter)
    }
    else if (!(letters.includes(normalized))) {
      let actualWrongLetter = [...wrongLetters, normalized]
      setWrongLetters(actualWrongLetter)
      setGuesses(guesses - 1)
    }
    
    if (guesses <= 1) {
      setGameStage(stages[2].name)
    }
  }
  const restartGame = () => {
    setScore(0)
    setGuesses(guessQty)
    setGameStage(stages[1].name)
    setGuessedLetters([])
    setWrongLetters([])
    startGame()
  }
  const continueGame = () => {
    setGuesses(guessQty)
    setGameStage(stages[1].name)
    setGuessedLetters([])
    setWrongLetters([])
    startGame()
  }
  const startScreen = () => {
    setScore(0)
    setGuesses(guessQty)
    setGuessedLetters([])
    setWrongLetters([])
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "playing" && (
        <Playing
          pickedCategory={pickedCategory}
          pickedWord={pickedWord}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          verifyLetter={verifyLetter}
        />
      )}
      {gameStage === "gameOver" && <GameOver 
      score={score} 
      guesses={guesses}
      restartGame={restartGame}
      continueGame={continueGame}
      startScreen={startScreen}
      />}
    </div>
  );
}

export default App;
