import type { Request, Response, NextFunction, RequestHandler } from "express";
import { ApiError } from "@/errors/ApiError";
import { Store_User } from "./user.model";
import { hashPassword, comparePassword } from "./utilities/password";
import { generateAuthTokenJWT } from "./utilities/authTokenJWT";
import { getUserWithoutSensitive } from "./utilities/getUserWithoutSensitive";

type RegisterUserRequestBody = {
  username: string;
  password: string;
};

/**
 * Express Middleware Controller for Register User
 */
export const registerUser = async (
  req: Request<{}, {}, RegisterUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  // parse request data
  const { username, password } = req.body;

  // check if request data is valid
  if (!username) {
    throw ApiError.badRequest("Username is required");
  }
  if (!password) {
    throw ApiError.badRequest("Password is required");
  }

  // check that user does not exists
  const userExists = await Store_User.findOne({ where: { username } });
  if (userExists) {
    throw ApiError.badRequest("User with this username already exists");
  }

  // create a new User
  // create a new user password
  // persist the user
  const createdUser = await Store_User.createOne({
    username,
    password: await hashPassword(password)
  });

  // check if user is successfully created
  if (!createdUser) {
    throw ApiError.badRequest("Impossible to create the user.");
  }

  // build an autorization token for the user
  const token = generateAuthTokenJWT(
    { id: createdUser.id },
    { expiresIn: "30d" }
  );

  // return the user and the token
  res.json({
    user: getUserWithoutSensitive(createdUser),
    token
  });
};

// ==============================================================
// ==============================================================
// ==============================================================
// ==============================================================

type LoginUserRequestBody = {
  username: string;
  password: string;
};
/**
 * Express Middleware Controller for Login User
 */
export const loginUser = async (
  req: Request<{}, {}, LoginUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  // parse request data
  const { username, password } = req.body;

  // Check if request data is valid
  if (!username) {
    throw ApiError.badRequest("Username is required");
  }
  if (!password) {
    throw ApiError.badRequest("Password is required");
  }

  // Check that user exists
  const user = await Store_User.findOne({ where: { username } });
  const userExists = !!user;
  if (!userExists) {
    throw ApiError.badRequest("User with this username not exists exists.");
  }

  // Chek if password matches
  const passwordMatches = await comparePassword(password, user.password);
  if (!passwordMatches) {
    throw ApiError.badRequest("Password does not matches.");
  }

  // build an autorization token for the user
  const token = generateAuthTokenJWT({ id: user.id }, { expiresIn: "30d" });

  // return the user and the token
  res.json({
    user: getUserWithoutSensitive(user),
    token
  });
};

// ==============================================================
// ==============================================================
// ==============================================================
// ==============================================================

export const getUserData: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // parse request data
  const { id } = req.user ?? {};

  // Check if request data is valid
  if (!id) {
    throw ApiError.badRequest("Id is required");
  }

  // Check that user exists
  const user = await Store_User.findOne({ where: { id } });
  const userExists = !!user;
  if (!userExists) {
    throw ApiError.badRequest("User with this id not exists.");
  }

  // return user to client
  res.json({
    user: getUserWithoutSensitive(user)
  });
};
