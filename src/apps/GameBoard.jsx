export default function GameBoard({ onActivePlayer, board }) {
  return (
    <ol id="game-board">
      {board.map((rows, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {rows.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onActivePlayer(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
