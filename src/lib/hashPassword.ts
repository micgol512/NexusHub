import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds: number = 12;
  const salt: string = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function verifyPassword(
  enteredPassword: string,
  storedPasswordHash: string
): Promise<boolean> {
  const isValid = await bcrypt.compare(enteredPassword, storedPasswordHash);
  return isValid;
}
