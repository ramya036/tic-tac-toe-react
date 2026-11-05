import React from "react";
import Square from "./Square.js";

function GameGrid({ moves, click, highlight = [], disabled = false }) {
  return (
    <div id="game-grid" role="grid" aria-label="Board">
      {moves.map((player, i) => (
        <Square
          key={i}
          index={i}
          player={player}
          winning={highlight.includes(i)}
          disabled={disabled || Boolean(player)}
          click={() => click(i)}
        />
      ))}
    </div>
  );
}

export default GameGrid;
