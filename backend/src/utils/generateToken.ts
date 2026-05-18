import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (userId: string, role: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"]
  };

  return jwt.sign({ id: userId, role }, jwtSecret, options);
};