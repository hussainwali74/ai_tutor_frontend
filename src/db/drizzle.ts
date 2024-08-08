import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// const sql = neon(
//   "postgresql://aitutordb_owner:x3TkyiNJCGV2@ep-tight-frost-a1j1that.ap-southeast-1.aws.neon.tech/aitutordb?sslmode=require" ||
//     "postgresql://aitutordb_owner:x3TkyiNJCGV2@ep-tight-drost-a1j1that.ap-southeast-1.aws.neon.tech/aitutordb?sslmode=require"
// );
// const sql = neon(process.env.DATABASE_URL||'postgresql://aitutordb_owner:x3TkyiNJCGV2@ep-tight-drost-a1j1that.ap-southeast-1.aws.neon.tech/aitutordb?sslmode=require');
const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

export default db;
