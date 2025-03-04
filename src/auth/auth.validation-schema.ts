import { JSONSchemaType } from "ajv";
import { User } from "../modules/users";

export const signInValidationSchema: JSONSchemaType<
  User
> = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: {
      type: "string",
      minLength: 6,
      pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$",
    },
    username: {type: "string"}
  },
  required: ["email", "password"],
  additionalProperties: false,
};
