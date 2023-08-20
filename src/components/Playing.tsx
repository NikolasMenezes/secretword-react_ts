import { FunctionComponent, useState } from "react"
import "./Playing.css"

interface playingProps {
  pickedWord: string,
  pickedCategory: string,
  letters: string[],
  guessedLetters: string[],
  wrongLetters: string[],
  guesses: number,
  score: number,
  verifyLetter: Function
}

const Playing: FunctionComponent<playingProps> = (
  {
    guessedLetters,
    guesses,
    letters,
    pickedCategory,
    score,
    wrongLetters,
    verifyLetter
  }) => {

  const [userLetter, setUserLetter] = useState("")
  const hanldeSubmit = (e: any) => {
    e.preventDefault()

    verifyLetter(userLetter)
    setUserLetter("")
  }

  return (
    <div className="game">
      <p>Pontuação: <span className="points">{score}</span></p>
      <h2>Advinhe a palavra:</h2>
      <p>Dica sobre a palavra: <span className="tip">{pickedCategory}</span></p>
      <p>Você ainda tem {guesses} tentativas</p>
      <div className="letters-container">
        {letters.map((letter, index) => (
          guessedLetters.includes(letter) ?
            (<span className="letterSquare" key={index}><span className="letter">{letter}</span></span>)
            : (<span className="letterSquare" key={index}></span>)
        ))}
      </div>
      <p>Tente advinhar uma letra da palavra</p>
      <div className="triedLetter">
        <p>Letras já utilizadas: <span>{wrongLetters.join(', ')}</span></p>
      </div>
      <form onSubmit={hanldeSubmit}>
        <input type="text" name="letter" maxLength={1}
          required onChange={(e) => setUserLetter(e.target.value)}
          value={userLetter} />
        <button>Jogar</button>
      </form>
    </div>
  )
}

export default Playing