import type { User, CreatableUser } from "./user.types.d";
import { fakeDb } from "./user.db";
import { objectContainsFields } from "@/utilities/object";
import { generateRandomId } from "./utilities/randomId";

/**
 * User model, has direct access to the User persistent store (DB).
 */
export const Store_User = {
  findOne: async ({ where }: { where: Partial<User> }) => {
    return fakeDb.find((item) => objectContainsFields(item, where));
  },
  createOne: async (userData: CreatableUser) => {
    const newUser = {
      ...userData,
      id: generateRandomId()
    };
    fakeDb.push(newUser);
    return newUser;
  }
};
