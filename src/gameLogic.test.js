import { computerMove, emptyBoard, emptySquares, getWinner, getWinningLine } from "./gameLogic";

const b = (s) => s.split("").map((c) => (c === "." ? "" : c));

test("detects wins on rows, columns and diagonals", () => {
  expect(getWinner(b("XXX......"))).toBe("X");
  expect(getWinner(b("O..O..O.."))).toBe("O");
  expect(getWinner(b("X...X...X"))).toBe("X");
  expect(getWinner(b("..O.O.O.."))).toBe("O");
});

test("detects a tie and an unfinished game", () => {
  expect(getWinner(b("XOXXOOOXX"))).toBe("Tie");
  expect(getWinner(b("XO......."))).toBeNull();
  expect(getWinner(emptyBoard())).toBeNull();
});

test("a win on the last square is a win, not a tie", () => {
  expect(getWinner(b("XOXOXOOXX"))).toBe("X");
});

test("returns the winning line for highlighting", () => {
  expect(getWinningLine(b("..X.X.X.."))).toEqual([2, 4, 6]);
  expect(getWinningLine(b("XO......."))).toBeNull();
});

test("lists empty squares", () => {
  expect(emptySquares(b("XO.X.....")).length).toBe(6);
});

test("computer takes a winning move first", () => {
  expect(computerMove(b("OO.XX...."))).toBe(2);
});

test("computer blocks the player's winning move", () => {
  expect(computerMove(b("XX..O...."))).toBe(2);
});

test("computer prefers the center, then a corner", () => {
  expect(computerMove(b("X........"))).toBe(4);
  expect(computerMove(b("....X...."), "O", "X", () => 0)).toBe(0);
});

test("computer has no move on a full board", () => {
  expect(computerMove(b("XOXXOOOXX"))).toBeNull();
});
