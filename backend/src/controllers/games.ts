import express from "express";

import {
  createGame,
  deleteGameById,
  getGameById,
  getGamesByUser,
  updateGameById,
} from "../db/games";
import { getUserBySessionToken } from "../db/users";
import { newGameValidation } from "../helpers";
import { makeMove } from "../helpers/makeMove";

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
      const validatedGame = newGameValidation(board);
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

    const updatedGame = {
      board: board,
      status: game.status,
      character: game.character,
      firstMove: game.firstMove,
    };

    // const updatedGameWithMove = makeMove(updatedGame);

    const savedUpdatedGame = await updateGameById(id, updatedGame);

    return res.status(200).json(savedUpdatedGame).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
