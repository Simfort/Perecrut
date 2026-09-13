type ZodMessage<T> = {
  expected: string;
  code: string;
  path: T;
  message: string;
};
type Path = Omit<ZodMessage<string>, "path">;
export type Paths<K extends string> = Partial<Record<K, Path>>;

export const parseZodError = <K extends string>(messages: ZodMessage<K>[]) => {
  const paths = {} as Paths<K>;
  for (const message of messages) {
    paths[message.path] = {
      expected: message.expected,
      message: message.message,
      code: message.code,
    };
  }
  return paths;
};
