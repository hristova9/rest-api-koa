import config from "../config";
import { CreatedUser } from "../modules/users";
import * as jwt from "jsonwebtoken";

export const createToken = (user: CreatedUser) => {
  if (!config.jwtSecret) {
    throw new Error("JWT secret is missing!");
  }

  return jwt.sign(
    {
      id: user.id,
    },
    config.jwtSecret,
    { expiresIn: "1h" }
  );
};

export const verifyToken = (token: string) => {
  if (!config.jwtSecret) {
    throw new Error("JWT secret is missing!");
  }

  return jwt.verify(token, config.jwtSecret);
};
