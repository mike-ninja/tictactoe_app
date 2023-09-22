import { Board } from "types";

const validateBoardFormat = (board: unknown): board is Board => {
  if (!Array.isArray(board) || board.length !== 3) {
    return false;
  }

  return board.every((row) =>
    Array.isArray(row) && row.length === 3 &&
    row.every((cell) => typeof cell === "string" && cell.length === 1)
  );
};

export default validateBoardFormat;
