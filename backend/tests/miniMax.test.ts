import miniMax from "../src/helpers/miniMax";
import { Board } from "../src/types";

describe("miniMax", () => {
  it("should return move to defend", () => {
    const board = [
      ["X", "O", "X"],
      ["-", "O", "O"],
      ["-", "X", "-"],
    ] as Board;
    const currentPlayer = "X";

    const result = miniMax(board, currentPlayer);

    expect(result).toEqual({ row: 1, col: 0 });
  });

  it("should return move to win", () => {
    const board = [
      ["X", "-", "O"],
      ["-", "O", "-"],
      ["X", "O", "X"],
    ] as Board;
    const currentPlayer = "X";

    const result = miniMax(board, currentPlayer);

    expect(result).toEqual({ row: 1, col: 0 });
  });

  it("This should make a defending move", () => {
    const board = [
      ["O", "X", "-"],
      ["X", "O", "-"],
      ["-", "-", "-"],
    ] as Board;
    const currentPlayer = "O";

    const result = miniMax(board, currentPlayer);

    expect(result).toEqual({ row: 2, col: 2 });
  });

  it("This should make another a defending move", () => {
    const board = [
      ["O", "X", "-"],
      ["O", "-", "-"],
      ["-", "-", "-"],
    ] as Board;
    const currentPlayer = "O";

    const result = miniMax(board, currentPlayer);

    expect(result).toEqual({ row: 2, col: 0 });
  });

  it("This should not use randomizer function", () => {
    const board = [
      ["O", "X", "X"],
      ["X", "O", "-"],
      ["O", "X", "-"],
    ] as Board;
    const currentPlayer = "X";

    const result = miniMax(board, currentPlayer);

    expect(result).toEqual({ row: 2, col: 2 });
  });
});
