import { UserWithoutSensitive } from "../domains/user/user.types.d";

declare global {
  namespace Express {
    interface Request {
      user?: UserWithoutSensitive;
    }
  }
}
