import mongoose from "mongoose";

export interface UserInterface {
  id: string;
  username: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  games: mongoose.Types.ObjectId[];
  _id: mongoose.Types.ObjectId;
  __v: mongoose.Types.ObjectId;
}

export interface GameInterface {
  id: string,
  board: string[],
  status: string,
  user: mongoose.Types.ObjectId;
  _id: mongoose.Types.ObjectId;
  __v: mongoose.Types.ObjectId;
}
