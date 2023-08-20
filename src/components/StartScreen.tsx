import "./StartScreen.css";

interface StartGameProps {
  startGame: () => void;
}

const StartScreen: React.FC<StartGameProps> = ({ startGame }) => {
  return (
    <div className="start">
      <h1>Secret Word - React</h1>
      <p>Clique no botão abaixo para começar a aventura &gt;-&lt;</p>
      <button onClick={startGame}>Começar</button>
    </div>
  );
};

export default StartScreen;
