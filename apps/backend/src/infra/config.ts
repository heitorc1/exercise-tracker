export const APP_ENV = process.env.APP_ENV ?? 'local';
export const APP_PORT = Number(process.env.APP_PORT ?? 8000);
export const APP_KEY =
  process.env.APP_KEY ?? 'd41d8cd98f00b204e9800998ecf8427e';

export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
