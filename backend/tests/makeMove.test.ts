import { makeMove } from "../src/helpers/makeMove";
import { Board, Character, Status } from "../src/types";

describe("makeMove", () => {
  it("computer should return move to defend", () => {
    const currentGame = {
      board: [
        ["O", "X", "-"],
        ["O", "-", "-"],
        ["-", "-", "-"],
      ] as Board,
      status: "onGoing" as Status,
      character: "O" as Character,
      firstMove: true,
    };

    const result = makeMove(currentGame);

    expect(result.board).toEqual([
      ["O", "X", "-"],
      ["O", "-", "-"],
      ["X", "-", "-"],
    ]);
    expect(result.status).toBe("onGoing");
  });

  it("computer should return move to win", () => {
    const currentGame = {
      board: [
        ["X", "-", "-"],
        ["-", "O", "-"],
        ["X", "O", "X"],
      ] as Board,
      status: "onGoing" as Status,
      character: "X" as Character,
      firstMove: true,
    };

    const result = makeMove(currentGame);

    expect(result.board).toEqual([
      ["X", "O", "-"],
      ["-", "O", "-"],
      ["X", "O", "X"],
    ]);
    expect(result.status).toBe("lose");
  });

  it("computer should lose", () => {
    const currentGame = {
      board: [
        ["O", "O", "O"],
        ["X", "-", "O"],
        ["X", "-", "X"],
      ] as Board,
      status: "onGoing" as Status,
      character: "O" as Character,
      firstMove: false,
    };

    const result = makeMove(currentGame);

    expect(result.status).toBe("win");
  });
});
