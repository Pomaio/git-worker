import { add, clone, commit, plugins, push } from 'isomorphic-git';

import * as fs from 'fs';
const fsp = fs.promises;

import { action } from 'mobx';
import { FormStore } from './FormStore';
plugins.set('fs', fs);

const rootDir = 'dir';

export class GitStore extends FormStore {
  @action
  async add() {
    await this.goCircularRepo(path => {
      const filepath = path.replace(rootDir + '/', '');
      add({ dir: rootDir, filepath });
    });
  }
  @action
  async addTestFile(name: string, data: string) {
    await fsp.writeFile(rootDir + '/' + `${name}`, data);
  }
  @action
  async cleanFolder() {
    (fs as any).vol.reset();
  }
  @action
  async clone(url: string) {
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
  async commit() {
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
  }
  @action
  async goRepo(f?: any) {
    const files = (fs as any).vol.toJSON();
    for (const path in files) {
      const coolPath = path.replace('/' + rootDir, '');
      console.log(coolPath, path);
      !path.includes('.git') ? await f(coolPath) : '';
    }
  }

  @action
  async modifyFile(path: string, f: any) {
    const coolPath = '/' + rootDir + path;
    const file = (await fsp.readFile(coolPath)).toString();
    await fsp.writeFile(coolPath, f(file));
  }
  @action
  async modifyScript(url: string, f: any) {
    const r = url.match(/\w+\/(?<group>\S+)\/(?<project>\S+)/);
    const repo = {
      group: (r as any)?.groups.group,
      project: (r as any)?.groups.project,
      url
    };
    console.log(repo);
    await f(fsp, (fs as any).vol, repo);
  }

  @action
  async push(url: string) {
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
}
