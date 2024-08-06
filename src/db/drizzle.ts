import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

console.log('-----------------------------------------------------');
console.log('process.env',process.env);
console.log('-----------------------------------------------------');
console.log('process.env.NEXT_PUBLIC_DATABASE_URL',process.env.NEXT_PUBLIC_DATABASE_URL);
console.log('-----------------------------------------------------');

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL||'s');

const db = drizzle(sql, { schema });

export default db;
