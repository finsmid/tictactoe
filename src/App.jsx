import { useState } from "react";
import Player from "./apps/Player.jsx";
import GameBoard from "./apps/GameBoard.jsx";
import Log from "./apps/Log.jsx";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS.js";
import GameOver from "./apps/GameOver.jsx";

const initialGridBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  let gridBoard = [...initialGridBoard.map((arr) => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gridBoard[row][col] = player;
  }

  let activePlayer = deriveActivePlayer(gameTurns);

  let winner = null;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSymbol = gridBoard[combinations[0].row][combinations[0].column];
    const secondSymbol = gridBoard[combinations[1].row][combinations[1].column];
    const thirdSymbol = gridBoard[combinations[2].row][combinations[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = firstSymbol;
    }
  }

  const draw = gameTurns.length === 9 && !winner;

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayersName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  function handleActive(rowIndex, colIndex) {
    // setActivePlayer(curActivePlayer => (curActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      //     let currentPlayer = "X";

      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   currentPlayer = "O";
      // }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onActivePlayer={handleActive} board={gridBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
