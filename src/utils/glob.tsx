// import fg from 'fast-glob';
// import fs from 'fs';
// const path = require('path');
// const custom_fs = { globSync: fg.sync, ...fs };
const mm = require('micromatch');
// import micromatch from 'micromatch';

export const glob = (
  paths: string[],
  patterns: string[]
): string[] | undefined => {
  // return mm.capture(patterns, paths);
  return mm(paths, patterns);
};
// const entries = custom_fs.globSync(['*'], { stats: true, cwd: '/dir' });
// console.log(entries);
