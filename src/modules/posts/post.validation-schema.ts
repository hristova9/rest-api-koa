import { JSONSchemaType } from "ajv";
import { Post } from "./post.interface";

export const postValidationSchema: JSONSchemaType<Post> = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3 },
    description: { type: "string", minLength: 10 },
  },
  additionalProperties: false,
  required: ["title", "description"],
};
