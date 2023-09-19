import mongoose from "mongoose";
import { GameInterface } from "types";

const GameSchema = new mongoose.Schema({
  board: [
    String,
    String,
    String,
  ],
  status: String,
  character: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

GameSchema.set("toJSON", {
  transform: (_document: mongoose.Document, returnedObject: GameInterface) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const GameModel = mongoose.model("Game", GameSchema);

// Get all games from db NOTE: This is currently not being used
export const getGames = () =>
  GameModel.find().populate("user", { username: 1 });

// Get game by id from db
export const getGameById = (id: string) =>
  GameModel.findById(id).populate("user", { username: 1 });

// Create game to db
export const createGame = (values: Record<string, any>) =>
  new GameModel(values).save().then((game) => game);

// Delete game
export const deleteGameById = (id: string) =>
  GameModel.findOneAndDelete({ _id: id });

// Update game
export const updateGameById = (id: string, values: Record<string, any>) =>
  GameModel.findByIdAndUpdate(id, values, { new: true });

// Get gamesByUser
export const getGamesByUser = (userId: string) =>
  GameModel.find({ user: userId }).populate("user", { username: 1 });
