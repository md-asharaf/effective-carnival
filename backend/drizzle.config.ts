import type { Config } from "drizzle-kit";
import envVars from "./src/config/envVars";

export default {
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: envVars.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
} satisfies Config;
