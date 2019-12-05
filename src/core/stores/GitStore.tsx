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

export class GitStore {
  constructor(protected formStore: FormStore) {}
  @action
  async add() {
    await this.forEachFile(async v => {
      const s = await status({
        dir: '/',
        filepath: relative('/', v)
      });
      console.log('path:', v, ' status:', s);
      if (s !== 'unmodified' && s !== 'ignored') {
        add({ dir: '/', filepath: relative('/', v) });
      }
    });
  }

  @action
  async clone(url: string) {
    await clone({
      dir: '/',
      url,
      singleBranch: true,
      depth: 1,
      username: this.formStore.login,
      password: this.formStore.password
    });
  }

  @action
  async commit() {
    await commit({
      dir: '/',
      author: {
        name: this.formStore.username || this.formStore.login,
        email: this.formStore.email
      },
      message: this.formStore.commitInfo || 'Нет сообщения о коммите'
    });
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
  @action
  test() {
    const files = Reflect.ownKeys((fs as any).vol.toJSON()) as string[];

    files.map(v =>
      fs.chmod(v, 0o755, err => {
        if (err) throw err;
        console.log(
          'The permissions for file "my_file.txt" have been changed!'
        );
      })
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
    const json = (fs as any).vol.toJSON();
    Reflect.ownKeys(json).forEach(k => {
      if ((k as any).startsWith('/.git')) {
        console.log();
      }
    });

    const r = await push({
      dir: '/',
      url,
      username: this.formStore.login,
      password: this.formStore.password
    });
    if (r && r.errors && r.errors.length > 0) {
      throw r.errors;
    }
  }

  @action
  reset() {
    (fs as any).vol.reset();
    (fs as any).vol.fromJSON({
      '/': null
    });
  }

  async status() {
    const r = await (await statusMatrix({ dir: '/', pattern: '**/*' })).filter(
      v => v[1] !== 1 || v[2] !== 1 || v[3] !== 1
    );
    console.log(r);
  }
}
