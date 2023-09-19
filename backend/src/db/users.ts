import mongoose from "mongoose";
import { UserInterface } from "types";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
});

UserSchema.set("toJSON", {
  transform: (_document: mongoose.Document, returnedObject: UserInterface) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const UserModel = mongoose.model("User", UserSchema);

// Get all users from db
export const getUsers = () =>
  UserModel.find().populate("games", { board: 1, status: 1, character: 1 });

// Get user by username from db
export const getUserByUsername = (username: string) =>
  UserModel.findOne({ username });

// Get user by sesstionToken from db
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

// Get user by id from db
export const getUserById = (id: string) => UserModel.findById(id);

// Create user to db
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user);

// Delete user by id from db
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

// Update a user by id from db NOTE: This is currently not being used
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
