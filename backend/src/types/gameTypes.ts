export type Character = "X" | "O";

export type Status = "onGoing" | "completed";

export type Board = [
  string,
  string,
  string,
];

export type Game = {
  board: Board;
  status: Status;
  character: Character;
};
