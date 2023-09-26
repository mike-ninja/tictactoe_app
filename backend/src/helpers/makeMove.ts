import { Board, Character, Game, GameResult, Move, Status } from "../types";

const checkWin = (board: Board, player: Character): boolean => {
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

const isDraw = (board: Board): boolean => {
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

const randomizerMove = (board: Board): Move => {
  let randomRow: number = Math.floor(Math.random() * 2);
  let randomCol: number = Math.floor(Math.random() * 2);

  while (board[randomRow][randomCol] !== "-") {
    randomRow = Math.floor(Math.random() * 3);
    randomCol = Math.floor(Math.random() * 3);
  }
  return { row: randomRow, col: randomCol };
};

const checkResult = (
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

// const getMinResult = (
//   results: GameResult[],
// ): { result: GameResult; index: number } => {
//   let minIndex = 0;
//   let minResult = results[0];
//
//   for (let i = 1; i < results.length; i++) {
//     if (results[i] < minResult) {
//       minResult = results[i];
//       minIndex = i;
//     }
//   }
//
//   return { result: minResult, index: minIndex };
// };

const duplicateBoardWithMove = (
  board: Board,
  move: Move,
  player: Character,
): Board => {
  const newBoard = board.map((row) => [...row]);
  newBoard[move.row][move.col] = player;

  return newBoard;
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

export const miniMax = (
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

  // console.log(`results ${results}`);
  // console.log(`result ${result}`);

  if (result === 1 && getMinResult(results) === 1) {
    return randomizerMove(board);
  }
  return moves[index];
};

const resultToStatus = (result: GameResult): Status => {
  let status: Status;

  switch (result) {
    case GameResult.Win:
      status = "win";
      break;
    case GameResult.Ongoing:
      status = "onGoing";
      break;
    case GameResult.Draw:
      status = "draw";
      break;
    case GameResult.Lose:
      status = "lose";
      break;
    default:
      break;
  }

  return status;
};

export const makeMove = (game: Game): Game => {
  const computerCharacter = game.character === "X" ? "O" : "X";
  let gameResult = checkResult(game.board, game.character);

  if (gameResult !== GameResult.Ongoing) {
    return {
      ...game,
      status: resultToStatus(gameResult),
    };
  }

  const move = miniMax(
    game.board,
    computerCharacter,
  );

  // console.log(`move row ${move.row} ${move.col}`);

  gameResult = checkResult(game.board, computerCharacter, move);

  switch (gameResult) {
    case GameResult.Win:
      gameResult = GameResult.Lose;
      break;
    case GameResult.Lose:
      gameResult = GameResult.Win;
      break;
    default:
      break;
  }

  return {
    ...game,
    board: duplicateBoardWithMove(game.board, move, computerCharacter),
    status: resultToStatus(gameResult),
  };
};

// export const miniMax = (
//   board: Board,
//   player: Character,
// ): { status: GameResult; move?: Move } => {
//   const gameStatus = checkResult(board, player);
//
//   if (gameStatus !== GameResult.Ongoing) {
//     return ({ status: gameStatus, move: undefined });
//   }
//
//   let moves: Move[] = [];
//   let results: GameResult[] = [];
//
//   for (let row = 0; row < 3; row++) {
//     for (let col = 0; col < 3; col++) {
//       if (board[row][col] === "-") {
//         const newBoard = board.map((row) => [...row]);
//         newBoard[row][col] = player;
//
//         const result = checkUserMoves(newBoard, player === "X" ? "O" : "X");
//
//         results.push(result);
//         moves.push({ row: row, col: col });
//       }
//     }
//   }
//
//   let { result, index } = getMinResult(results); // We want the move that has the lowest result
//   let bestMove = moves[index];
//   // let { result, index } = getMaxResult(results); // We want the move that has the lowest result
//
//   console.log(`results ${results}`);
//   console.log(`minResult ${result}`);
//   console.log(`bestMove ${moves[index].row} ${moves[index].col}`);
//
//   if (result === GameResult.Lose) {
//     result = GameResult.Win;
//   } else if (result === GameResult.Win) {
//     result = GameResult.Lose;
//     bestMove = undefined;
//   }
//
//   return { status: result, move: bestMove };
// };
//
// export const makeMove = (game: Game): Game => {
//   let newStatus: Status;
//   // const { status, move } = miniMax(game.board, game.character);
//   const { status, move } = miniMax(
//     game.board,
//     game.character === "X" ? "O" : "X",
//   );
//
//   if (status !== GameResult.Ongoing && status !== GameResult.Win) {
//     switch (status) {
//       case GameResult.Lose:
//         newStatus = "win";
//         break;
//       case GameResult.Draw:
//         newStatus = "draw";
//         break;
//       default:
//         break;
//     }
//     return {
//       ...game,
//       status: newStatus,
//     };
//   }
//
//   let updatedBoard: Board = [...game.board];
//   updatedBoard[move.row][move.col] = game.character === "X" ? "O" : "X";
//
//   if (status === GameResult.Win) {
//     newStatus = "lose";
//   } else {
//     newStatus = "onGoing";
//   }
//   return {
//     ...game,
//     board: updatedBoard,
//     status: newStatus,
//   };
// };
