import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv"

dotenv.config()

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env

// creates sql connection using our env variables
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)
