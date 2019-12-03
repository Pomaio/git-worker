const mm = require('micromatch');

export const glob = (
  paths: string[],
  patterns: string[]
): string[] | undefined => {
  return mm(paths, patterns);
};
export const globMatch = (path: string, patterns: string[]): boolean => {
  return mm.isMatch(path, patterns);
};
