export type Character = "X" | "O" | "-";

export type Status = "onGoing" | "win" | "lose" | "draw";

export type Board = Character[][];

export type Move = {
  row: number | undefined;
  col: number | undefined;
};

export enum GameResult {
  Win,
  Draw,
  Lose,
  Ongoing,
}

export type Game = {
  board: Board;
  status: Status;
  character: Character;
  firstMove: boolean;
};
