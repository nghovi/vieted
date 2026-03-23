import mysql from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return new Map();
  }

  const content = fs.readFileSync(filePath, "utf8");
  const values = new Map();

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

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, "..");
const textbookDir = path.resolve(rootDir, "textbooks/history-grade-9");
const chStockEnv = parseEnvFile(path.resolve(currentDir, "../../../../ch_stock/.env"));

const config = {
  host: process.env.DB_HOST ?? chStockEnv.get("DB_HOST") ?? "127.0.0.1",
  port: Number(process.env.DB_PORT ?? chStockEnv.get("DB_PORT") ?? "3306"),
  user: process.env.DB_USERNAME ?? chStockEnv.get("DB_USERNAME") ?? "root",
  password: process.env.DB_PASSWORD ?? chStockEnv.get("DB_PASSWORD") ?? "",
  database: process.env.DB_DATABASE ?? "vieted",
};

if (!fs.existsSync(textbookDir)) {
  console.log(`Textbook directory not found: ${textbookDir}`);
  process.exit(0);
}

const files = fs
  .readdirSync(textbookDir)
  .filter((file) => file.endsWith(".txt"))
  .sort();

if (files.length === 0) {
  console.log(`No textbook chapter text files found in: ${textbookDir}`);
  process.exit(0);
}

const connection = await mysql.createConnection({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
});

for (const file of files) {
  const chapterId = file.replace(/\.txt$/, "");
  const contentText = fs.readFileSync(path.join(textbookDir, file), "utf8").trim();

  if (!contentText) {
    continue;
  }

  await connection.query(
    `insert into history_textbook_chapters (chapter_id, source_label, content_text)
     values (?, 'Nhập từ tệp văn bản cục bộ', ?)
     on duplicate key update
       source_label = values(source_label),
       content_text = values(content_text)`,
    [chapterId, contentText],
  );
}

await connection.end();

console.log(
  `Imported ${files.length} textbook chapter file(s) from ${textbookDir}`,
);
