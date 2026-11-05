import { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Game from "./Game";

const square = (row, col) => screen.getByRole("button", { name: new RegExp(`^Row ${row}, column ${col}`) });

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

function playX(row, col) {
  fireEvent.click(square(row, col));
  act(() => jest.runOnlyPendingTimers()); // let the computer answer
}

test("you play X and the computer answers with O", () => {
  render(<Game delay={10} />);
  expect(screen.getByRole("status")).toHaveTextContent("Your turn (X)");
  playX(1, 1);
  expect(square(1, 1)).toHaveTextContent("X");
  expect(screen.getAllByRole("button", { name: /, O$/ })).toHaveLength(1);
  expect(square(2, 2)).toHaveTextContent("O"); // computer takes the center
});

test("taken squares can't be clicked again", () => {
  render(<Game delay={10} />);
  playX(1, 1);
  expect(square(1, 1)).toBeDisabled();
});

test("the computer blocks, wins, and the score updates", () => {
  render(<Game delay={10} />);
  playX(1, 1); // O takes center
  playX(1, 2); // O must block at 1,3
  expect(square(1, 3)).toHaveTextContent("O");
  playX(3, 3); // O completes the diagonal 1,3 - 2,2 - 3,1
  expect(screen.getByRole("status")).toHaveTextContent("Computer wins!");
  expect(screen.getByLabelText("Score")).toHaveTextContent("Computer 1");
  expect(square(2, 3)).toBeDisabled(); // board locked after a win
});

test("new game clears the board and keeps the score", () => {
  render(<Game delay={10} />);
  playX(1, 1); playX(1, 2); playX(3, 3);
  fireEvent.click(screen.getByRole("button", { name: "New game" }));
  expect(screen.getAllByRole("button", { name: /empty$/ })).toHaveLength(9);
  expect(screen.getByLabelText("Score")).toHaveTextContent("Computer 1");
});
