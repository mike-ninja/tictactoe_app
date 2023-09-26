import validateBoardFormat from "./validateBoardFormat";
import { Board, Character, Game, Status } from "types";

const validateNewBoard = (board: Board) => {
  let firstMove: boolean | undefined = undefined;
  let character: Character | undefined = undefined;

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
    firstMove = false;
    character = "O";
  } else {
    firstMove = true;
  }

  return { character, firstMove };
};

export const validateNewGame = (board: unknown): Game => {
  if (!board || !validateBoardFormat(board)) {
    throw new Error("Board is incorrect format.");
  }

  try {
    const { character, firstMove } = validateNewBoard(board);

    const newGame = {
      board: board,
      status: "onGoing" as Status,
      character: character as Character,
      firstMove: firstMove,
    };

    return newGame;
  } catch (error) {
    throw error;
  }
};
