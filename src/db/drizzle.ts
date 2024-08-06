import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
let db: any = null;
console.log('-----------------------------------------------------');
console.log('process.env.DATABASE_URL',process.env.DATABASE_URL);
console.log('-----------------------------------------------------');

if (process.env.DATABASE_URL) {
  const sql = neon(process.env.DATABASE_URL! || "-32");

  db = drizzle(sql, { schema });
}
export default db;
