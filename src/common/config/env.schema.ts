import * as joi from 'joi';

export const envSchemaJoi = joi.object({
  MONGODB: joi.required(),
  PORT: joi.number().default(3000),
  DB_NAME: joi.string().default('db_act'),
});
