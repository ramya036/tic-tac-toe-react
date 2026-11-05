// Pure game rules, kept separate from React so they are easy to test.

export const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

export const emptyBoard = () => Array(9).fill("");

/** Returns "X" or "O" for a win, "Tie" for a full board, otherwise null. */
export function getWinner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every(Boolean) ? "Tie" : null;
}

/** The three squares of the winning line, for highlighting. */
export function getWinningLine(board) {
  return LINES.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]) || null;
}

export const emptySquares = (board) => board.flatMap((v, i) => (v ? [] : [i]));

/** Square that would complete a line for `player`, or null. */
function finishingMove(board, player) {
  for (const line of LINES) {
    const marks = line.map((i) => board[i]);
    if (marks.filter((m) => m === player).length === 2 && marks.includes("")) {
      return line[marks.indexOf("")];
    }
  }
  return null;
}

/**
 * Computer move: win if possible, otherwise block the opponent, otherwise take the
 * center, then a corner, then any square. `random` is injectable for tests.
 */
export function computerMove(board, me = "O", them = "X", random = Math.random) {
  const open = emptySquares(board);
  if (open.length === 0) return null;
  const win = finishingMove(board, me);
  if (win !== null) return win;
  const block = finishingMove(board, them);
  if (block !== null) return block;
  if (board[4] === "") return 4;
  const corners = [0, 2, 6, 8].filter((i) => board[i] === "");
  const pool = corners.length ? corners : open;
  return pool[Math.floor(random() * pool.length)];
}
