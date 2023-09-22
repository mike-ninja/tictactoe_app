import express from "express";

import {
  createGame,
  deleteGameById,
  getGameById,
  getGamesByUser,
  updateGameById,
} from "../db/games";
import { getUserBySessionToken } from "../db/users";
import { parseGameObject, validateGame, validateNewGame } from "../helpers";
import { makeMove } from "../helpers/makeMove";
import { Character, Status } from "types";

// Getting all games by user
export const getAllGamesByUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const sessionToken = req.cookies["MBARUTEL-AUTH"];
    const user = await getUserBySessionToken(sessionToken);

    const games = await getGamesByUser(user.id);

    return res.status(200).json(games);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

// Getting a game by user
export const getGame = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const game = await getGameById(id);

    if (!game) {
      return res.sendStatus(404);
    }

    return res.status(200).json(game);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

// Creating a game for user
export const createNewGame = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { board } = req.body;

    if (!board) {
      return res.status(400).json({ error: "Board is missing." });
    }

    try {
      const validatedGame = validateNewGame(board);
      const gameWithMove = makeMove(validatedGame);

      const sessionToken = req.cookies["MBARUTEL-AUTH"];
      const user = await getUserBySessionToken(sessionToken);

      const newGame = await createGame({
        ...gameWithMove,
        user: user.id,
      });

      user.games = user.games.concat(newGame._id);
      await user.save();

      return res.status(200).json(newGame);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

// Deleting a game by user
export const deleteGame = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;

    const deletedGame = await deleteGameById(id);

    if (!deletedGame) {
      return res.sendStatus(404);
    }

    return res.json(deletedGame);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

// Updating a game by user
export const updateGame = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { board } = req.body;

    if (!board) {
      return res.sendStatus(400);
    }

    const game = await getGameById(id);
    const parsedGame = parseGameObject(game);

    try {
      const validatedGame = validateGame(board, parsedGame);

      console.log("before move");
      const updatedGameWithMove = makeMove(validatedGame);

      console.log("Move was made");
      const savedUpdatedGame = await updateGameById(id, updatedGameWithMove);

      return res.status(200).json(savedUpdatedGame).end();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
