import "./GameOver.css";
import { FunctionComponent } from 'react'

interface GameOverProps {
  score: number
  guesses: number
  startScreen: () => void
  restartGame: () => void
  continueGame: () => void
}

const GameOver: FunctionComponent<GameOverProps> = ({ score, guesses, restartGame, continueGame, startScreen}) => {
  return (

  <div className="gameOver">
    <h2>Fim de Jogo!</h2>
    {guesses >= 1 ? (
    <>
    <p>A sua pontuação atual é <span className="score">{score}</span></p>
    <button onClick={continueGame}>Continuar!</button>
    </>):
    (<>
    <p>A sua pontuação foi de <span className="score">{score}</span></p>
    <button onClick={restartGame}>Jogar de novo!</button>
    <p onClick={startScreen} className="returnStart">Voltar ao iníco</p>
    </>)}
  </div>);
};

export default GameOver;
