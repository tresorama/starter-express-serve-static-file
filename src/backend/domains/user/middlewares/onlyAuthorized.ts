import type { Request, Response, NextFunction } from "express";
import { Store_User } from "../user.model";
import { ApiError } from "@/errors/ApiError";
import { decodeAuthTokenJWT } from "../utilities/authTokenJWT";
import { omit } from "lodash";

export const onlyAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // parse autorization header
    const { authorization } = req.headers;

    // check that Bearer Authorization is set
    if (!authorization || !authorization.startsWith("Bearer")) {
      throw new Error();
    }

    // check user
    const token = authorization.split(" ")[1];
    const { id } = decodeAuthTokenJWT(token) as { id: string };
    const user = await Store_User.findOne({ where: { id } });
    if (!user) {
      throw new Error();
    }

    // inject user into request so next middleware can use it
    req.user = omit(user, "password");

    // go on in middleware chain
    next();
  } catch (error) {
    throw ApiError.unauthorized();
  }
};
