import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

type MysqlConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

function parseEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return new Map<string, string>();
  }

  const content = fs.readFileSync(filePath, "utf8");
  const values = new Map<string, string>();

  for (const line of content.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) {
      continue;
    }

    const index = line.indexOf("=");
    if (index === -1) {
      continue;
    }

    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values.set(key, value);
  }

  return values;
}

export function getMysqlConfig() {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const chStockEnv = parseEnvFile(
    path.resolve(currentDir, "../../../../ch_stock/.env"),
  );

  const host = process.env.DB_HOST ?? chStockEnv.get("DB_HOST") ?? "127.0.0.1";
  const port = Number(process.env.DB_PORT ?? chStockEnv.get("DB_PORT") ?? "3306");
  const user = process.env.DB_USERNAME ?? chStockEnv.get("DB_USERNAME") ?? "root";
  const password =
    process.env.DB_PASSWORD ?? chStockEnv.get("DB_PASSWORD") ?? "";
  const database = process.env.DB_DATABASE ?? "vieted";

  return {
    host,
    port,
    user,
    password,
    database,
  } satisfies MysqlConfig;
}
