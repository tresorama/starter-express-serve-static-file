import type { RequestHandler } from "express";

type LoggerPlain = (text: string) => RequestHandler;

/**
 * Function that return an Express Middleware Handler used to console log.
 * @param text text to log in the console
 */
export const loggerPlain: LoggerPlain = (text: string) => (req, res, next) => {
  console.log(text);
  next();
};
