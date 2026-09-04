export interface Recruter {
  id: string;
  firstname: string;
  lastname: string;
  description: string;
  email: string;
  password: string;
  created_at: string;
}
export type RecruterMain = Pick<
  Recruter,
  "firstname" | "lastname" | "email" | "password"
> &
  Partial<Pick<Recruter, "description">>;

export type RecruterJWT = Pick<Recruter, "email">;
