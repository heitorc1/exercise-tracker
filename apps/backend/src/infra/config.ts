export const APP_ENV = process.env.APP_ENV ?? 'local';
export const APP_HOST = process.env.APP_HOST ?? 'localhost';
export const APP_PORT = Number(process.env.APP_PORT ?? 8000);
export const APP_KEY = process.env.APP_KEY ?? 'app-key';

export const DB_HOST = process.env.DB_HOST;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
