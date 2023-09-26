import { Board, Character, GameResult, Move } from "../types";
import { checkResult, duplicateBoardWithMove } from "./makeMoveUtils";

const randomizerMove = (board: Board): Move => {
  let randomRow: number = Math.floor(Math.random() * 2);
  let randomCol: number = Math.floor(Math.random() * 2);

  while (board[randomRow][randomCol] !== "-") {
    randomRow = Math.floor(Math.random() * 3);
    randomCol = Math.floor(Math.random() * 3);
  }
  return { row: randomRow, col: randomCol };
};

const getMaxResult = (
  results: GameResult[],
): { result: GameResult; index: number } => {
  let maxIndex = 0;
  let maxResult = results[0];

  for (let i = 1; i < results.length; i++) {
    if (results[i] > maxResult) {
      maxResult = results[i];
      maxIndex = i;
    }
  }

  return { result: maxResult, index: maxIndex };
};

const getMinResult = (
  results: GameResult[],
): GameResult => {
  let minResult = results[0];

  for (let i = 1; i < results.length; i++) {
    if (results[i] < minResult) {
      minResult = results[i];
    }
  }

  return minResult;
};

const checkUserMoves = (board: Board, user: Character): GameResult => {
  let gameStatus = checkResult(board, user);

  if (gameStatus !== GameResult.Ongoing) {
    return gameStatus;
  }

  let results: GameResult[] = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "-") {
        const newBoard = duplicateBoardWithMove(board, { row, col }, user);

        gameStatus = checkResult(newBoard, user);

        results.push(gameStatus);
      }
    }
  }

  return getMinResult(results);
};

const miniMax = (
  board: Board,
  player: Character,
): Move => {
  let moves: Move[] = [];
  let results: GameResult[] = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "-") {
        const newBoard = duplicateBoardWithMove(board, { row, col }, player);

        const result = checkUserMoves(newBoard, player === "X" ? "O" : "X");

        results.push(result);
        moves.push({ row: row, col: col });
      }
    }
  }

  const { result, index } = getMaxResult(results);

  if (result === 1 && getMinResult(results) === 1) {
    return randomizerMove(board);
  }
  return moves[index];
};

export default miniMax;
