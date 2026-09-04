import EnvError from "../errors/EnvError.js";

export const checkENV = (messageError: string, env?: string) => {
  if (!env) {
    throw new EnvError(messageError);
  }
  return env;
};
