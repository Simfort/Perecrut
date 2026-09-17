export const Vacancies = `--sql
    CREATE TABLE IF NOT EXISTS vacancies(
        id TEXT NOT NULL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        recruter_id TEXT NOT NULL,
        emp_type TEXT NOT NULL,
        salary_min INTEGER NOT NULL,
        salary_max INTEGER NOT NULL,
        organization TEXT NOT NULL,
        created_at TEXT NOT NULL   DEFAULT(datetime('now')),
        FOREIGN KEY (recruter_id) REFERENCES recruters(id)
        ON DELETE CASCADE
    )

`;
