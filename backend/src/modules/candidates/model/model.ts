export const Candidates = `--sql
    CREATE TABLE IF NOT EXISTS candidates(
        id VARCHAR(255)  NOT NULL PRIMARY KEY,
        firstname VARCHAR(255)  NOT NULL,
        lastname VARCHAR(255)  NOT NULL,
        description TEXT NOT NULL,
        color TEXT NOT NULL,
        vacancy_id TEXT NOT NULL,
        created_at TEXT NOT NULL  DEFAULT(datetime('now')),
        FOREIGN KEY (vacancy_id) REFERENCES vacancies(id)
        ON DELETE CASCADE
    )
    `;
