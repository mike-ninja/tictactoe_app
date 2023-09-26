export type Character = "X" | "O" | "-";

export type Status = "onGoing" | "win" | "lose" | "draw";

export type Board = Character[][];

export type Move = {
  row: number | undefined;
  col: number | undefined;
};

export enum GameResult {
  Win, // 0
  Ongoing, // 1
  Draw, // 2
  Lose, // 3
}

export type Game = {
  board: Board;
  status: Status;
  character: Character;
  firstMove: boolean;
};
