import { Board, Character, Game, Status } from "types";

const checkBoardFormat = (board: unknown): board is Board => {
  if (!Array.isArray(board) || board.length !== 3) {
    return false;
  }

  return board.every((element) =>
    typeof element === "string" && element.length === 3
  );
};

const moveValidation = (board: Board): Character => {
  let character: Character = undefined;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const element = board[i][j];
      if (element !== "-" && element !== "X" && element !== "O") {
        throw new Error("Incorrect character in the board.");
      } else if (
        (element === "X" || element === "O") && character !== undefined
      ) {
        throw new Error("Too many moves.");
      } else if (element === "X" || element === "O") {
        character = element;
      }
    }
  }

  if (character === undefined) {
    character = "X";
  }

  return character;
};

export const newGameValidation = (board: unknown): Game => {
  if (!board || !checkBoardFormat(board)) {
    throw new Error("Board is incorrect format.");
  }
  try {
    const character: Character = moveValidation(board);

    const newGame = {
      board: board,
      status: "onGoing" as Status,
      character: character,
    };
    return newGame;
  } catch (error) {
    throw error;
  }
};
