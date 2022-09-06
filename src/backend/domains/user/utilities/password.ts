import bcrypt from "bcryptjs";

/**
 * Return an hash for a password
 * @param password The password to hash
 */
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Test a password against an hash
 * @param password The password (not hashed) to test
 * @param hashedPassword The hash to test against. This hash is a return value of "hashPassword()"
 */
export const comparePassword = async (
  password: string,
  hashedPassword: Awaited<ReturnType<typeof hashPassword>>
) => {
  return await bcrypt.compare(password, hashedPassword);
};
