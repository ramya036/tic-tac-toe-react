import React from "react";

function Square({ index, player, winning, disabled, click }) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  return (
    <button
      className={[player, winning ? "win" : ""].join(" ").trim()}
      onClick={click}
      disabled={disabled}
      aria-label={`Row ${row}, column ${col}${player ? `, ${player}` : ", empty"}`}
    >
      {player}
    </button>
  );
}

export default Square;
