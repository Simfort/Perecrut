export const Candidates = `--sql
    CREATE TABLE IF NOT EXISTS candidates(
        id VARCHAR(255)  NOT NULL IS PRIMARY,
        firstname VARCHAR(255)  NOT NULL,
        secondname VARCHAR(255)  NOT NULL,
        description TEXT NOT NULL,
        color TEXT NOT NULL,
        vacancy_id TEXT NOT NULL,
        created_at TEXT NOT NULL  DEFAULT(datetime('now')),
        FOREIGN KEY (vacancy_id) REFERENCES vacancies(id)
        ON DELETE CASCADE
    )
    `;

export interface Candidate {
  id: number;
  firstname: string;
  lastname: string;
  description: string;
  color: string;
  vacancy_id: string;
  created_at: string;
}
