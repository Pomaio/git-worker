import fs from 'fs';
import * as git from 'isomorphic-git';
import { action } from 'mobx';

// git.plugins.set('fs', fs);
const fsp = fs.promises;

export class LogicStore {
  dir = '/test';

  @action
  async fetchRepo() {
    console.log(fs, fs.promises);
    const files = fs.readdir(__dirname, e => console.log(e)); //.realpath(__dirname);
  }
}
