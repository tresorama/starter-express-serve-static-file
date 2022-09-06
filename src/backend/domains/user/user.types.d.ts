export interface User {
  id: string;
  username: string;
  password: string;
}
export type CreatableUser = Omit<User, "id">;
export type UserWithoutSensitive = Omit<User, "password">;
