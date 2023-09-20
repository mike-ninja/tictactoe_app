import { Board, Character, Game, Status } from "types";

const checkBoardFormat = (board: unknown): board is Board => {
  if (!Array.isArray(board) || board.length !== 3) {
    return false;
  }

  return board.every((element) =>
    typeof element === "string" && element.length === 3
  );
};

const newMoveValidation = (board: Board) => {
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
        character = element === "X" ? "O" : "X";
      }
    }
  }

  if (character === undefined) {
    firstMove = true;
    character = "X";
  } else {
    firstMove = false;
  }

  return { character, firstMove };
};

// const updateMoveValidation = (board: Board, character: Character): Status => {
//   var myMoves = 0;
//   var enemyMoves = 0;
//
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const element = board[i][j];
//       if (element !== "-" && element !== "X" && element !== "O") {
//         throw new Error("Incorrect character in the board.");
//       } else if (element === "X" || character === "O") {
//         if (element === character) {
//           myMoves += 1;
//         } else {
//           enemyMoves += 1;
//         }
//       }
//     }
//   }
// };

export const newGameValidation = (board: unknown): Game => {
  if (!board || !checkBoardFormat(board)) {
    throw new Error("Board is incorrect format.");
  }
  try {
    const { character, firstMove } = newMoveValidation(board);

    const newGame = {
      board: board,
      status: "onGoing" as Status,
      character: character,
      firstMove: firstMove,
    };

    return newGame;
  } catch (error) {
    throw error;
  }
};

// export const updateGameValidation = (board: unknown): Game => {
//   if (!board || !checkBoardFormat(board)) {
//     throw new Error("Board is incorrect format.");
//   }
// };
