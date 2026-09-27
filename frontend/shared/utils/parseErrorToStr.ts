import { Paths } from "./parseZodError";

export const parseErrorToStr = <T extends string>(
  state: Partial<{ error: Paths<T> }>,
) =>
  (Object.keys(state!.error!) as T[])
    .map((err) => err + `: ${state!.error![err]?.message}`)
    .join(" , ");
