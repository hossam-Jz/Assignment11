import dotenv from "dotenv";

dotenv.config({ path: "./src/config/dev.env" });

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const SALT_ROUND = Number(process.env.SALT_ROUND);
export const ENC_KEY = process.env.ENC_KEY;
export const ACCESS_ADMIN_SECRET_TOKEN = process.env.ACCESS_ADMIN_SECRET_TOKEN;
export const ACCESS_ADMIN_SECRET_TOKEN_EXPIRES_IN =
  process.env.ACCESS_ADMIN_SECRET_TOKEN_EXPIRES_IN;
export const REFRESH_ADMIN_SECRET_TOKEN =
  process.env.REFRESH_ADMIN_SECRET_TOKEN;
export const REFRESH_ADMIN_SECRET_TOKEN_EXPIRES_IN =
  process.env.REFRESH_ADMIN_SECRET_TOKEN_EXPIRES_IN;
export const ACCESS_USER_SECRET_TOKEN = process.env.ACCESS_USER_SECRET_TOKEN;
export const ACCESS_USER_SECRET_TOKEN_EXPIRES_IN =
  process.env.ACCESS_USER_SECRET_TOKEN_EXPIRES_IN;
export const REFRESH_USER_SECRET_TOKEN = process.env.REFRESH_USER_SECRET_TOKEN;
export const REFRESH_USER_SECRET_TOKEN_EXPIRES_IN =
  process.env.REFRESH_USER_SECRET_TOKEN_EXPIRES_IN;
export const CLIENT_ID = process.env.CLIENT_ID;
