import EnvError from "../errors/EnvError";

export const checkENV = (messageError: string, env?: string) => {
  if (!env) {
    throw new EnvError(messageError);
  }
  return env;
};
