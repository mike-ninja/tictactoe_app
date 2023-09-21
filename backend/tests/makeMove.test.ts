// makeMove.test.ts

import { miniMax } from "../src/helpers/makeMove"; // Import the miniMax function from your makeMove.ts file
import { GameResult } from "../src/types";

describe("miniMax", () => {
  it("should return move to defend", () => {
    const board = [
      ["X", "O", "X"],
      ["-", "O", "O"],
      ["-", "X", "-"],
    ];
    const currentPlayer = "X";

    const result = miniMax(board, currentPlayer);

    // Access the properties 'move' and 'score' from the result object
    expect(result.move).toEqual({ row: 1, col: 0 }); // Example assertion
    expect(result.status).toBe(GameResult.Ongoing); // Example assertion
  });

  it("should return move to win", () => {
    const board = [
      ["X", "O", "X"],
      ["X", "O", "O"],
      ["-", "X", "O"],
    ];
    const currentPlayer = "X";

    const result = miniMax(board, currentPlayer);

    // Access the properties 'move' and 'score' from the result object
    expect(result.move).toEqual({ row: 2, col: 0 }); // Example assertion
    expect(result.status).toBe(GameResult.Win); // Example assertion
  });

  it("should return a draw", () => {
    const board = [
      ["X", "O", "X"],
      ["X", "X", "O"],
      ["O", "X", "O"],
    ];
    const currentPlayer = "X";

    const result = miniMax(board, currentPlayer);

    // Access the properties 'move' and 'score' from the result object
    expect(result.move).toEqual(undefined); // Example assertion
    expect(result.status).toBe(GameResult.Draw); // Example assertion
  });

  it.only("without randomizer will return to last move", () => {
    const board = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    const currentPlayer = "X";

    const result = miniMax(board, currentPlayer);

    // Access the properties 'move' and 'score' from the result object
    // expect(result.move).toEqual({ row: 2, col: 2 }); // Example assertion
    expect(result.status).toBe(GameResult.Ongoing); // Example assertion
  });

  it("This should return a loss", () => {
    const board = [
      ["O", "-", "O"],
      ["X", "-", "O"],
      ["X", "-", "-"],
    ];
    const currentPlayer = "X";

    const result = miniMax(board, currentPlayer);

    // Access the properties 'move' and 'score' from the result object
    expect(result.move).toEqual(undefined); // Example assertion
    expect(result.status).toBe(GameResult.Lose); // Example assertion
  });

  it("This should return Ongoing", () => {
    const board = [
      ["O", "X", "O"],
      ["X", "-", "O"],
      ["X", "-", "-"],
    ];
    const currentPlayer = "X";

    const result = miniMax(board, currentPlayer);

    // Access the properties 'move' and 'score' from the result object
    // expect(result.move).toEqual(undefined); // Example assertion
    expect(result.status).toBe(GameResult.Ongoing); // Example assertion
  });

  it("This should not use randomizer function", () => {
    const board = [
      ["O", "X", "X"],
      ["X", "O", "-"],
      ["O", "X", "-"],
    ];
    const currentPlayer = "X";

    const result = miniMax(board, currentPlayer);

    // Access the properties 'move' and 'score' from the result object
    expect(result.move).toEqual({ row: 2, col: 2 }); // Example assertion
    expect(result.status).toBe(GameResult.Ongoing); // Example assertion
  });
});
