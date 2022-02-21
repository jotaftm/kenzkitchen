import { createConnection } from "typeorm";

export const connectDatabase = () => {
  createConnection().then(() => console.log("Database Connected"));
};
