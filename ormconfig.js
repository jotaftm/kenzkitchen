const devEnv = {
  type: "postgres",
  host: "localhost",
  port: "5432",
  database: "kenzkitchen_db",
  username: "postgres",
  password: "password",
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  logging: true,
  synchronize: false,
};

const prodEnv = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["./dist/entities/**/*.js"],
  migrations: ["./dist/database/migrations/*.js"],
  cli: {
    migrationsDir: "./dist/database/migrations",
  },
  synchronize: false,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};

const testEnv = {
  type: "sqlite",
  database: ":memory:",
  entities: ["./src/entities/**/*.ts"],
  synchronize: true,
};

let exportModule = undefined;
if (process.env.NODE_ENV === "production") {
  exportModule = prodEnv;
} else if (process.env.NODE_ENV === "test") {
  exportModule = testEnv;
} else {
  exportModule = devEnv;
}

module.exports = exportModule;
