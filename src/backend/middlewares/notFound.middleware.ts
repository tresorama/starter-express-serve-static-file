import type { RequestHandler } from "express";
import { NotFoundError } from "@/errors/NotFoundError";
/**
 * Express MMiddleware that trigger
 * an error indicating that the resource is not found
 * @param req Express Request
 * @param res Express Response
 * @param next Epress NextFunction
 */
export const notFound: RequestHandler = (req, res, next) => {
  // if code arrives here means
  // that no one has handled the request
  throw new NotFoundError();
};
