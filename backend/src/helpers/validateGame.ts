import { Board, Character, Game, GameResult, Status } from "types";
import validateBoardFormat from "./validateBoardFormat";

const validateBoard = (
  board: Board,
  character: Character,
  firstMove: boolean,
): Board => {
  var myMoves = 0;
  var enemyMoves = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const element = board[i][j];
      if (element !== "-" && element !== "X" && element !== "O") {
        throw new Error("Incorrect character in the board.");
      } else if (element === "X" || element === "O") {
        if (element === character) {
          myMoves += 1;
        } else {
          enemyMoves += 1;
        }
      }
    }
  }

  console.log(`enemy ${enemyMoves}`);
  console.log(`player ${myMoves}`);
  console.log(`firstMove ${firstMove}`);

  if (firstMove === false && (enemyMoves - 1) === myMoves) {
    return board;
  } else if (firstMove === true && enemyMoves === myMoves) {
    return board;
  }
  throw new Error("Incorrect amount of moves.");
};

export const validateGame = (
  board: unknown,
  game: Game,
): Game => {
  if (!board || !validateBoardFormat(board)) {
    throw new Error("Board is incorrect format.");
  } else if (game.status !== "onGoing") {
    throw new Error("Game is completed.");
  }

  try {
    const validatedBoard = validateBoard(
      board,
      game.character,
      game.firstMove,
    );

    const updatedGame = {
      ...game,
      board: validatedBoard,
    };

    return updatedGame;
  } catch (error) {
    throw error;
  }
};
