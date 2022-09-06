import type { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const getSecret = () => process.env.JWT_SECRET ?? "";

export const generateAuthTokenJWT = (
  payload: any,
  jwtSignOptions?: SignOptions
) => {
  return jwt.sign(payload, getSecret(), jwtSignOptions);
};

export const decodeAuthTokenJWT = (token: string) => {
  return jwt.verify(token, getSecret());
};
