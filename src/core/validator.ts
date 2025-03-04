import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import { Context, Next } from 'koa';
import { CreatedUser, User } from '../modules/users';

const ajv = new Ajv();
addFormats(ajv);

export const validator = (schema: JSONSchemaType<User | CreatedUser>) => async (ctx: Context, next: Next) => {
  const validate: ValidateFunction = ajv.compile(schema);
  const valid = validate(ctx.request.body);
  if (!valid) {
    ctx.throw(400, { message: validate.errors });
  }
  
  await next();
}