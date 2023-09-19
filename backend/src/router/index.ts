import express from "express";

import authentication from "./authentication";
import users from "./users";
import games from "./games";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  games(router);

  return router;
};
