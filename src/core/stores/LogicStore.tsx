import { add, clone, commit, plugins, push } from 'isomorphic-git';
import { action } from 'mobx';
const path = require('path');

import * as fs from 'fs';

plugins.set('fs', fs);

const dir = 'repo';
const username = 'g.marshinov';
const password = 'Mju76yui';
const url = 'http://gitlab.ds.local/g.marshinov/test';

export class LogicStore {
  // тут пока не создается папки нужно посылать что-то на вход и делать dir + input
  @action
  async addDirTest() {
    fs.mkdir(dir, { recursive: true }, err => {
      if (err) throw err;
    });
  }
  @action
  async cleanFolder() {
    fs.promises
      .rmdir(dir)
      .then(() => console.log('good'), e => console.log('error', e))
      .finally(() => console.log('finish'));
    // fs.readdir(dir, function(err, files) {
    //   if (err) throw err;
    // for (const file of files) {
    //   if (file.charAt(0) === '.') {
    //     fs.rmdir(path.join(dir, file), err => {
    //       if (err) throw err;
    //     });
    //   } else {
    //     fs.unlink(path.join(dir, file), err => {
    //       if (err) throw err;
    //     });
    //   }
    // }
    // });
  }
  @action
  async gitCommit() {
    await commit({
      dir,
      author: {
        name: 'Mr. DevOps',
        email: 'g.marshinov@deltasolutions.ru'
      },
      message: 'Added the a .txt file'
    });
  }
  @action
  async gitPull() {
    console.log('fetch');
    await clone({
      dir,
      username,
      password,
      url,
      ref: 'master',
      singleBranch: true,
      depth: 1
    })
      .then(() => console.log('good'), e => console.log('error', e))
      .finally(() => console.log('finish'));
  }
  @action
  async gitPush() {
    await push({
      dir,
      url,
      username,
      password,
      ref: 'master'
    });
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
          () => console.log('good'),
          e => console.log('error', e)
        );
      }
    );
  }
}
