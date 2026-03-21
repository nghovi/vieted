import mysql from "mysql2/promise";
import { getMysqlConfig } from "./mysql-config";

const config = getMysqlConfig();

declare global {
  // eslint-disable-next-line no-var
  var __vietedMysqlPool: mysql.Pool | undefined;
}

export const pool =
  global.__vietedMysqlPool ??
  mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: 10,
    namedPlaceholders: true,
    charset: "utf8mb4",
  });

if (process.env.NODE_ENV !== "production") {
  global.__vietedMysqlPool = pool;
}
