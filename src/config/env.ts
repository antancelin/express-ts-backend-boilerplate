import "dotenv/config";

const REQUIRED_VARS = ["NODE_ENV", "CORS_ORIGIN"] as const;

for (const key of REQUIRED_VARS) {
  if (!process.env[key]) {
    console.error(`[env] Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
  CORS_ORIGIN: process.env.CORS_ORIGIN as string,
};
