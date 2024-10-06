import * as process from 'process';

export const EnvConfig = () => ({
  ENVIRONMENT: process.env.NODE_ENV || 'dev',
  DB_NAME: process.env.DB_NAME || 'db_act',
  MONGODB: process.env.MONGODB,
  PORT: process.env.PORT || 3000,
});
