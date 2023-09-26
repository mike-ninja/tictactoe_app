import { Game, GameResult, Status } from "../types";
import { checkResult, duplicateBoardWithMove } from "./makeMoveUtils";
import miniMax from "./miniMax";

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
