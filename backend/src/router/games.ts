import express from "express";

import {
  createNewGame,
  deleteGame,
  getAllGamesByUser,
  getGame,
  updateGame,
} from "../controllers/games";
import { isAuthenticated, isGameOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/games", isAuthenticated, getAllGamesByUser);
  router.get("/games/:id", isAuthenticated, isGameOwner, getGame);
  router.post("/games", isAuthenticated, createNewGame);
  router.delete("/games/:id", isAuthenticated, isGameOwner, deleteGame);
  router.put("/games/:id", isAuthenticated, isGameOwner, updateGame);
};
