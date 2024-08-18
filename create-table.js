import { sql } from "./db.js";

// sql`drop table if exists videos`.then(() => console.log("Dropped table!"))

sql`
create table videos(
    id          TEXT PRIMARY KEY,
    title       TEXT,
    description TEXT,
    duration    INTEGER
)`.then(() => console.log("Created Table!"))