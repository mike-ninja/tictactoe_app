import { Game } from "types";

const parseGameObject = (game: any): Game => {
  const parsedGame: Game = {
    board: game.board,
    status: game.status,
    character: game.character,
    firstMove: game.firstMove,
  };
  return parsedGame;
};

export default parseGameObject;
