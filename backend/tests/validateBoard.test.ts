import { validateBoardFormat } from "../src/helpers";

describe("validateBoardFormat", () => {
  it("valid board", () => {
    const board: any = [
      ["-", "-", "X"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];

    const result = validateBoardFormat(board);

    expect(result).toBe(true);
  });

  it("invalid board", () => {
    const board: any = [
      ["-", "-", "X"],
      ["-", "-", "-"],
    ];

    const result = validateBoardFormat(board);

    expect(result).toBe(false);
  });

  it("invalid board", () => {
    const board: any = [
      ["-", "-", "X"],
      ["-", "-", "-"],
      ["-", "-", "-", "-"],
    ];

    const result = validateBoardFormat(board);

    expect(result).toBe(false);
  });

  it("empty board", () => {
    const board: any = [];

    const result = validateBoardFormat(board);

    expect(result).toBe(false);
  });

  it("board with empty arrays", () => {
    const board: any = [
      [],
      [],
      [],
    ];

    const result = validateBoardFormat(board);

    expect(result).toBe(false);
  });

  it("undefined board", () => {
    const board: any = undefined;

    const result = validateBoardFormat(board);

    expect(result).toBe(false);
  });
});
