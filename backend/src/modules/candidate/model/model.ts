export const Candidate = `--sql
    CREATE TABLE candidates(
        id VARCHAR(255)  NOT NULL IS PRIMARY,
        firstname VARCHAR(255)  NOT NULL,
        secondname VARCHAR(255)  NOT NULL,
        description TEXT,
        created_at TEXT NOT NULL   DEFAULT(datetime('now'))
    )
    `;
