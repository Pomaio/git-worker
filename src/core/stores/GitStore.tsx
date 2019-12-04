import * as fs from 'fs';
import {
  add,
  clone,
  commit,
  plugins,
  push,
  status,
  statusMatrix
} from 'isomorphic-git';
import { action } from 'mobx';
import { dirname, join, relative } from 'path';
import { FormStore } from './FormStore';

const fsp = fs.promises;
plugins.set('fs', fs);

export class GitStore extends FormStore {
  @action
  async add() {
    await this.forEachFile(async v => {
      const s = await status({
        dir: '/',
        filepath: relative('/', v)
      });
      if (s !== 'unmodified' && s !== 'ignored') {
        add({ dir: '/', filepath: relative('/', v) });
      }
    });
  }

  @action
  async clone(url: string) {
    const i = {
      username: this.login,
      password: this.password
    };
    await clone({
      dir: '/',
      url,
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
      message: this.commitInfo || 'Нет сообщения о коммите'
    };
    await commit({ dir: '/', ...i });
  }

  @action
  async createFile(path: string, data: string) {
    await fsp.mkdir(dirname(path), { recursive: true });
    await fsp.writeFile(join('/', path), data);
  }

  @action
  async forEachFile(fn?: (path: string) => Promise<void>) {
    const files = Reflect.ownKeys((fs as any).vol.toJSON()) as string[];
    await Promise.all(
      files.map(v => (v.includes('.git') ? Promise.resolve() : fn?.(v)))
    );
  }

  async hasUnstaged() {
    return (await statusMatrix({ dir: '/', pattern: '**/*' })).some(
      v => v[1] !== 1 || v[2] !== 1 || v[3] !== 1
    );
  }

  @action
  async modifyFile(path: string, f: any) {
    const coolPath = join('/', path);
    const file = (await fsp.readFile(coolPath)).toString();
    await fsp.writeFile(coolPath, f(file));
  }

  @action
  async modifyScript(url: string, fn: (context: any) => Promise<void>) {
    const r = url.match(/\w+\/(?<group>\S+)\/(?<project>\S+)/);
    const repo = {
      group: (r as any)?.groups.group,
      project: (r as any)?.groups.project,
      url
    };
    await fn({ fsp, vol: (fs as any).vol, repo });
  }

  @action
  async push(url: string) {
    const r = await push({
      dir: '/',
      url,
      username: this.login,
      password: this.password
    });
    if (r && r.errors && r.errors.length > 0) {
      throw r.errors;
    }
  }

  @action
  async reset() {
    (fs as any).vol.reset();
  }
}
