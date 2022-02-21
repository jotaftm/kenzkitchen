import app from "./app";
import dotenv from "dotenv";
import { connectDatabase } from "./database/index";

dotenv.config();

connectDatabase();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`App is running at http://localhost:${PORT}`)
);
