import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let db:any;
console.log('-----------------------------------------------------');
console.log('process.env.NEXT_PUBLIC_DATABASE_URL',process.env.NEXT_PUBLIC_DATABASE_URL);
console.log('-----------------------------------------------------');

if (process.env.NEXT_PUBLIC_DATABASE_URL){
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL||'s');
    db = drizzle(sql, { schema });
}


export default db;
