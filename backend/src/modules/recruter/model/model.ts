export const Recruter = `--sql
    CREATE TABLE IF NOT EXISTS recruters(
        id TEXT NOT NULL PRIMARY KEY,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        description TEXT,
        email TEXT UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TEXT NOT NULL   DEFAULT(datetime('now'))
    )
    `;
