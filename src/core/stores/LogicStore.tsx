import { clone, commit, plugins, push, add } from 'isomorphic-git';
import { action } from 'mobx';

import * as fs from 'fs';

plugins.set('fs', fs);

const dir = 'repo';
const username = 'g.marshinov';
const password = 'Mju76yui';
const url = 'http://gitlab.ds.local/g.marshinov/test';

export class LogicStore {
  @action
  async fetch() {
    console.log('fetch');
    await clone({
      dir,
      username,
      password,
      url,
      ref: 'master',
      singleBranch: true,
      depth: 10
    })
      .then(v => console.log('good', v), e => console.log('error', e))
      .finally(() => console.log('finish'));
  }

  @action
  async readRepo() {
    fs.readdir(dir, function(err, contents) {
      if (err) throw err;
      console.log(contents.toString());
    });
  }

  @action
  async writeRepo() {
    await fs.writeFile(
      dir + '/test.txt',
      'Cool, I can do this in the browser!',
      function(err) {
        if (err) throw err;
        add({ dir, filepath: 'test.txt' }).then(
          v => console.log('good', v),
          e => console.log('error', e)
        );
      }
    );
  }
  // тут пока не создается папки нужно посылать что-то на вход и делать dir + input
  @action
  async addTest() {
    fs.mkdir(dir, { recursive: true }, err => {
      if (err) throw err;
    });
  }
  @action
  async commit() {
    await commit({
      dir,
      author: {
        name: 'Mr. Test',
        email: 'mrtest@example.com'
      },
      message: 'Added the a .txt file'
    });
  }
  @action
  async push() {
    await push({
      dir,
      url,
      username,
      password,
      ref: 'master'
    });
  }
}
