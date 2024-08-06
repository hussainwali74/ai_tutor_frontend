import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

console.log('-----------------------------------------------------');
console.log('process.env.NEXT_PUBLIC_DATABASE_URL',process.env.NEXT_PUBLIC_DATABASE_URL);
console.log('-----------------------------------------------------');

const sql = neon("postgresql://aitutordb_owner:x3TkyiNJCGV2@ep-tight-frost-a1j1that.ap-southeast-1.aws.neon.tech/aitutordb?sslmode=require"! || "postgresql://aitutordb_owner:x3TkyiNJCGV2@ep-tight-gross-2222that.ap-southeast-1.aws.neon.tech/aitutordb?sslmode=require");

const db = drizzle(sql, { schema });

export default db;
