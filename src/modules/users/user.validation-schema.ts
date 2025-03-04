import { JSONSchemaType } from "ajv";
import _ from "lodash";
import { CreatedUser, User } from "./user.interface";

export const userValidationSchema: JSONSchemaType<CreatedUser> = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    username: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    password: {
      type: "string",
      minLength: 6,
      pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$",
    },
  },
  additionalProperties: false,
  required: ["id", "username", "email", "password"],
};

export const createUserValidationSchema: JSONSchemaType<User> = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    password: {
      type: "string",
      minLength: 6,
      pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$",
    },
  },
  additionalProperties: false,
  required: ["username", "email", "password"],
};
