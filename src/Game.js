import React, { useEffect, useState } from "react";
import GameGrid from "./GameGrid.js";
import { computerMove, emptyBoard, getWinner, getWinningLine } from "./gameLogic.js";

const COMPUTER_DELAY_MS = 400;

function Game({ delay = COMPUTER_DELAY_MS }) {
  const [board, setBoard] = useState(emptyBoard);
  const [score, setScore] = useState({ X: 0, O: 0, Tie: 0 });

  const winner = getWinner(board);
  const xCount = board.filter((m) => m === "X").length;
  const oCount = board.filter((m) => m === "O").length;
  const turn = xCount > oCount ? "O" : "X"; // X (you) always moves first

  // Computer plays O. The winner is computed from the board itself, so it is
  // always up to date (no stale state between a move and the win check).
  useEffect(() => {
    if (winner || turn !== "O") return undefined;
    const timer = setTimeout(() => {
      setBoard((prev) => {
        if (getWinner(prev)) return prev;
        const square = computerMove(prev);
        if (square === null) return prev;
        const next = [...prev];
        next[square] = "O";
        return next;
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [board, winner, turn, delay]);

  // Count each finished game once
  useEffect(() => {
    if (winner) setScore((s) => ({ ...s, [winner]: s[winner] + 1 }));
  }, [winner]);

  function play(square) {
    if (winner || turn !== "X" || board[square]) return;
    const next = [...board];
    next[square] = "X";
    setBoard(next);
  }

  const status = winner === "Tie" ? "It's a tie!" : winner === "X" ? "You win!" : winner === "O" ? "Computer wins!" : turn === "X" ? "Your turn (X)" : "Computer is thinking…";

  return (
    <main>
      <h1>Tic-Tac-Toe</h1>
      <p role="status" aria-live="polite" className="status">{status}</p>
      <GameGrid moves={board} click={play} highlight={getWinningLine(board) || []} disabled={Boolean(winner) || turn !== "X"} />
      <p className="score" aria-label="Score">
        You <strong className="X">{score.X}</strong> · Computer <strong className="O">{score.O}</strong> · Ties <strong>{score.Tie}</strong>
      </p>
      <p>
        <button className="new-game" onClick={() => setBoard(emptyBoard())}>New game</button>
      </p>
    </main>
  );
}

export default Game;
