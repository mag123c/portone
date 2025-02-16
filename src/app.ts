import { loadEnv } from "./config/env.config";
loadEnv();

import cors from "cors";
import express from "express";
import { GlobalErrorHandler } from "./common/middlewares/exception.filter";
import { LoggingMiddleware } from "./common/middlewares/logging.middleware";
import router from "./routes";

console.log(
  "✅ Environment file loaded from: .env",
  process.env.PORTONE_TEST_API_KEY,
  process.env.PORTONE_TEST_API_SECRET,
  process.env.PORTONE_BASE_API_URL
);

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(LoggingMiddleware);
app.use(GlobalErrorHandler);

app.use("/api/v1", router);

export default app;
