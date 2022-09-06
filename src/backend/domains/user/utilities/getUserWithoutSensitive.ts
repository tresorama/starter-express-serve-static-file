import { omit } from "lodash";
import type { User, UserWithoutSensitive } from "../user.types";

export function getUserWithoutSensitive(user: User): UserWithoutSensitive {
  return omit(user, "password");
}
