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

const checkEnemyMoves = (board: Board, enemy: Character): GameResult => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "-") {
        const newBoard = board.map((row) => [...row]);
        newBoard[row][col] = enemy;

        if (checkWin(newBoard, enemy)) {
          return GameResult.Lose;
        } else if (isDraw(newBoard)) {
          return GameResult.Draw;
        }
      }
    }
  }
  return GameResult.Ongoing;
};

const randomizerMove = (board: Board): Move => {
  let randomRow: number = Math.floor(Math.random() * 2);
  let randomCol: number = Math.floor(Math.random() * 2);

  // console.log(randomRow);
  // console.log(randomCol);
  //
  while (board[randomRow][randomCol] !== "-") {
    randomRow = Math.floor(Math.random() * 3);
    randomCol = Math.floor(Math.random() * 3);
    console.log("Does it get stuck here");
    console.log(`randomRow ${randomRow}`);
    console.log(`randomCol ${randomCol}`);
  }
  return { row: randomRow, col: randomCol };
};

export const miniMax = (
  board: Board,
  player: Character,
): { status: GameResult; move?: Move } => {
  if (checkWin(board, player === "X" ? "O" : "X")) {
    return { status: GameResult.Lose };
  } else if (isDraw(board)) {
    return { status: GameResult.Draw };
  }

  let bestMove: Move = {
    row: undefined,
    col: undefined,
  };
  let bestResult: GameResult | undefined = undefined;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "-") {
        const newBoard = board.map((row) => [...row]);
        newBoard[row][col] = player;

        if (checkWin(newBoard, player)) { // Return immediatly if a winning move is found
          return { status: GameResult.Win, move: { row, col } };
        }

        const result = checkEnemyMoves(newBoard, player === "X" ? "O" : "X");

        if (result !== GameResult.Lose) {
          bestResult = result;
          bestMove = {
            row: row,
            col: col,
          };
        }
      }
    }
  }

  if (bestResult === undefined) { // If all the moves results in a loss
    return { status: GameResult.Lose, move: undefined };
  } else if (bestResult === GameResult.Draw) {
    bestResult = GameResult.Ongoing;
  } else if (
    bestResult === GameResult.Ongoing && bestMove.row === 2 &&
    bestMove.col === 2
  ) {
    // Randomizer
    bestMove = randomizerMove(board);
  }

  return { status: bestResult, move: bestMove };
};

export const makeMove = (game: Game): Game => {
  let newStatus: Status;
  const { status, move } = miniMax(game.board, game.character);

  if (status !== GameResult.Ongoing && status !== GameResult.Win) {
    switch (status) {
      case GameResult.Lose:
        newStatus = "win";
        break;
      case GameResult.Draw:
        newStatus = "draw";
        break;
      default:
        break;
    }
    return {
      ...game,
      status: newStatus,
    };
  }

  let updatedBoard: Board = [...game.board];
  updatedBoard[move.row][move.col] = game.character;

  if (status === GameResult.Win) {
    newStatus = "lose";
  } else {
    newStatus = "onGoing";
  }
  return {
    ...game,
    board: updatedBoard,
    status: newStatus,
  };
};
