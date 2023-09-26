import { Board, Character, GameResult, Move } from "../types";

export const checkWin = (board: Board, player: Character): boolean => {
  // Check rows, columns, and diagonals for a win
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true; // Row win
    }
    if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    ) {
      return true; // Column win
    }
  }
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    return true; // Diagonal win (top-left to bottom-right)
  }
  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    return true; // Diagonal win (top-right to bottom-left)
  }
  return false;
};

export const isDraw = (board: Board): boolean => {
  // Check if the game is a draw
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "-") {
        return false; // There is an empty cell, so it's not a draw
      }
    }
  }
  return true; // All cells are filled, it's a draw
};

export const checkResult = (
  board: Board,
  user: Character,
  move?: Move,
): GameResult => {
  let boardDuplicate = board.map((row) => [...row]);
  if (move !== undefined) {
    boardDuplicate[move.row][move.col] = user;
  }

  if (checkWin(boardDuplicate, user)) {
    return GameResult.Win;
  } else if (checkWin(boardDuplicate, user === "X" ? "O" : "X")) {
    return GameResult.Lose;
  } else if (isDraw(boardDuplicate)) {
    return GameResult.Draw;
  }
  return GameResult.Ongoing;
};

export const duplicateBoardWithMove = (
  board: Board,
  move: Move,
  player: Character,
): Board => {
  const newBoard = board.map((row) => [...row]);
  newBoard[move.row][move.col] = player;

  return newBoard;
};
