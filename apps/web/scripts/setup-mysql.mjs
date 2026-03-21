import mysql from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
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
const chStockEnv = parseEnvFile(path.resolve(currentDir, "../../../../ch_stock/.env"));

const config = {
  host: process.env.DB_HOST ?? chStockEnv.get("DB_HOST") ?? "127.0.0.1",
  port: Number(process.env.DB_PORT ?? chStockEnv.get("DB_PORT") ?? "3306"),
  user: process.env.DB_USERNAME ?? chStockEnv.get("DB_USERNAME") ?? "root",
  password: process.env.DB_PASSWORD ?? chStockEnv.get("DB_PASSWORD") ?? "",
  database: process.env.DB_DATABASE ?? "vieted",
};

const connection = await mysql.createConnection({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  multipleStatements: true,
});

await connection.query(
  `create database if not exists \`${config.database}\`
   character set utf8mb4
   collate utf8mb4_unicode_ci`,
);

await connection.changeUser({ database: config.database });

await connection.query(`
  create table if not exists students (
    id bigint primary key auto_increment,
    full_name varchar(120) not null,
    grade tinyint not null,
    phone_number varchar(20) not null unique,
    password_hash varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
  );

  create table if not exists student_sessions (
    session_token varchar(64) primary key,
    student_id bigint not null,
    expires_at datetime not null,
    created_at timestamp default current_timestamp,
    index idx_student_sessions_student_id (student_id),
    constraint fk_student_sessions_student_id
      foreign key (student_id) references students(id)
      on delete cascade
  );

  create table if not exists study_preferences (
    student_id bigint primary key,
    current_grade tinyint not null,
    current_subject varchar(40) not null,
    current_history_chapter_id varchar(120) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    constraint fk_study_preferences_student_id
      foreign key (student_id) references students(id)
      on delete cascade
  );

  create table if not exists history_chapters (
    id varchar(120) primary key,
    title varchar(255) not null,
    summary text not null,
    textbook_scope varchar(255) not null,
    learn_overview text not null,
    learn_key_ideas_json json not null,
    review_checklist_json json not null,
    review_quick_prompts_json json not null,
    sort_order int not null
  );

  create table if not exists history_question_sets (
    id varchar(120) primary key,
    chapter_id varchar(120) not null,
    title varchar(255) not null,
    sort_order int not null,
    constraint fk_history_question_sets_chapter_id
      foreign key (chapter_id) references history_chapters(id)
      on delete cascade
  );

  create table if not exists history_questions (
    id varchar(120) primary key,
    question_set_id varchar(120) not null,
    prompt text not null,
    options_json json not null,
    correct_option tinyint not null,
    explanation text not null,
    sort_order int not null,
    constraint fk_history_questions_set_id
      foreign key (question_set_id) references history_question_sets(id)
      on delete cascade
  );

  create table if not exists student_history_chapter_progress (
    student_id bigint not null,
    chapter_id varchar(120) not null,
    learn_status varchar(20) not null,
    learn_completed_at datetime null,
    last_activity_at datetime null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    primary key (student_id, chapter_id),
    constraint fk_student_history_chapter_progress_student_id
      foreign key (student_id) references students(id)
      on delete cascade
  );

  create table if not exists student_history_set_attempts (
    id bigint primary key auto_increment,
    student_id bigint not null,
    chapter_id varchar(120) not null,
    question_set_id varchar(120) not null,
    score_percent decimal(5,2) not null,
    correct_count int not null,
    total_questions int not null,
    submitted_at datetime not null,
    created_at timestamp default current_timestamp,
    index idx_student_history_set_attempts_student_id (student_id),
    index idx_student_history_set_attempts_chapter_id (chapter_id),
    constraint fk_student_history_set_attempts_student_id
      foreign key (student_id) references students(id)
      on delete cascade,
    constraint fk_student_history_set_attempts_set_id
      foreign key (question_set_id) references history_question_sets(id)
      on delete cascade
  );

  create table if not exists student_history_question_attempts (
    id bigint primary key auto_increment,
    set_attempt_id bigint not null,
    student_id bigint not null,
    chapter_id varchar(120) not null,
    question_set_id varchar(120) not null,
    question_id varchar(120) not null,
    selected_option tinyint not null,
    is_correct tinyint(1) not null,
    created_at datetime not null,
    index idx_student_history_question_attempts_attempt_id (set_attempt_id),
    index idx_student_history_question_attempts_student_id (student_id),
    constraint fk_student_history_question_attempts_attempt_id
      foreign key (set_attempt_id) references student_history_set_attempts(id)
      on delete cascade,
    constraint fk_student_history_question_attempts_student_id
      foreign key (student_id) references students(id)
      on delete cascade,
    constraint fk_student_history_question_attempts_question_id
      foreign key (question_id) references history_questions(id)
      on delete cascade
  );
`);

const passwordHash = crypto
  .scryptSync("vieted123", "vieted-local-salt", 64)
  .toString("hex");

await connection.query(
  `insert ignore into students (id, full_name, grade, phone_number, password_hash)
   values (1, 'Nguyen Minh Anh', 9, '0987654321', ?)`,
  [passwordHash],
);

await connection.query(
  `insert into study_preferences (student_id, current_grade, current_subject, current_history_chapter_id)
   values (1, 9, 'history', 'chuong-1-the-gioi-1918-1945')
   on duplicate key update
     current_grade = values(current_grade),
     current_subject = values(current_subject),
     current_history_chapter_id = values(current_history_chapter_id)`,
);

await connection.end();

console.log(`MySQL setup complete for database: ${config.database}`);
