import dotenv from "dotenv";

interface IConfig {
  port: number;
  db: string;
  jwtSecret?: string;
  sentry?: {
    dsn?: string;
  };
}

dotenv.config();
const config: IConfig = {
  port: Number(process.env.PORT ?? 4000),
  db: process.env.DB ?? "storage",
  jwtSecret: process.env.JWT_SECRET || "default_secret",
};

console.log("Server running on port:", config.port);
export default config;
