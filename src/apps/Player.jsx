import { useState } from "react";

export default function Player({ name, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleEdit() {
    setIsEditing((edit) => !edit);
  }

  function handleName(e) {
    setPlayerName(e.target.value);
  }

  let showPlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    showPlayerName = (
      <input type="text" required value={playerName} onChange={handleName} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {showPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
