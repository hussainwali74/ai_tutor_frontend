import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
let db: any = null;
if (process.env.DATABASE_URL) {
  const sql = neon(process.env.DATABASE_URL!);

  db = drizzle(sql, { schema });
}
export default db;
