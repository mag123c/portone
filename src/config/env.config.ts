import dotenv from "dotenv";
import path from "path";

export function loadEnv() {
  const rootPath = process.cwd();
  let envPath;

  if (process.env.NODE_ENV === "test") {
    envPath = path.resolve(rootPath, ".env.test");
  } else {
    envPath = path.resolve(rootPath, ".env");
  }

  dotenv.config({ path: envPath });
  console.log(`✅ Environment file loaded from: ${envPath}`);
}
