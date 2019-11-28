import { add, clone, commit, plugins, push } from 'isomorphic-git';

import * as fs from 'fs';
const fsp = fs.promises;

import { action } from 'mobx';
import { VariablesStore } from './VariablesStore';
plugins.set('fs', fs);

const rootDir = 'repo';
// const username = 'g.marshinov';
// const password = 'Mju76yui';
// const url = 'http://gitlab.ds.local/g.marshinov/test';
// const name = 'Mju76yui';
// const email = 'g.marshinov@deltasolutions.ru';

export class LogicStore extends VariablesStore {
  @action
  async addTestFile(name: string, data: string) {
    await fsp.writeFile(rootDir + `/${name}.txt`, data);
    await add({ dir: rootDir, filepath: `${name}.txt` });
  }
  @action
  async cleanFolder() {
    (fs as any).vol.reset();
  }
  @action
  async gitAdd() {
    await this.goCircularRepo(path => {
      const filepath = path.replace(rootDir + '/', '');
      add({ dir: rootDir, filepath });
    });
  }
  @action
  async gitCommit() {
    const i = {
      author: {
        name: this.username || this.login,
        email: this.email
      },
      message: this.commitInfo || 'No commit message'
    };
    await commit({ dir: rootDir, ...i });
  }
  @action
  async gitPull(url: string) {
    const i = {
      username: this.login,
      password: this.password
    };
    await clone({
      dir: rootDir,
      url,
      ref: 'master',
      singleBranch: true,
      depth: 1,
      ...i
    });
  }
  @action
  async gitPush(url: string) {
    const i = {
      username: this.login,
      password: this.password
    };
    await push({
      dir: rootDir,
      url,
      ref: 'master',
      ...i
    });
  }

  @action
  async goCircularRepo(f?: any) {
    async function getFiles(dir) {
      const files = await fsp.readdir(dir);
      for (const i in files) {
        const path = dir + '/' + files[i];
        files[i] !== '.git'
          ? fs.statSync(path).isDirectory()
            ? await getFiles(path)
            : await f(path)
          : '';
      }
    }
    await getFiles(rootDir);
    // await getFiles(rootDir);
  }

  @action
  async modifyFile(path: string, f: any) {
    const file = await (await fsp.readFile(path)).toString();
    await fsp.writeFile(path, f(file));
  }

  @action
  async readRepo() {
    await this.goCircularRepo(v => console.log(v));
  }
}
