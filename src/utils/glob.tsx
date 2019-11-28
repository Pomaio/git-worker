// import fg from 'fast-glob';
// import fs from 'fs';
// const path = require('path');
// const custom_fs = { globSync: fg.sync, ...fs };
const mm = require('micromatch');

export const glob = (
  paths: string[],
  patterns: string[]
): string[] | undefined => {
  return mm(paths, patterns);
};
export const globMatch = (paths: string, patterns: string[]): boolean => {
  return mm.isMatch(paths, patterns);
};
// больше информации тут
// https://github.com/micromatch/micromatch#micromatch

// const entries = custom_fs.globSync(['*'], { stats: true, cwd: '/dir' });
// console.log(entries);
