import { action, observable } from 'mobx';
import { LogicStore } from './LogicStore';

// import * as fg from 'fast-glob';
const fs = require('fs');
const path = require('path');
const __dirname = path.resolve();
console.log(path, __dirname);
// const a = fg.sync.bind(__dirname);
const saferEval = require('safer-eval');

export class ScriptStore {
  // tslint:disable: member-ordering

  @observable
  notificationMessage?: string;

  @observable
  notificationStatus?: boolean;

  constructor(protected logicStore: LogicStore) {}

  @action
  async scriptСode(url: string) {
    console.log('code');

    await this.logicStore.gitPull(url); // 1 pull
    const c = data => console.log(data);
    const f = saferEval(this.logicStore.actionData || '');
    // console.log(f, typeof f);
    await this.logicStore.goCircularRepo(v => this.logicStore.modifyFile(v, f));
    await this.logicStore.goCircularRepo(v => this.logicStore.modifyFile(v, c));
    await this.logicStore.gitAdd();
    await this.logicStore.gitCommit(); // 4 commit
    await this.logicStore.gitPush(url);

    // notification
    await this.setNotificationMessage('Успешно');
    this.setNotificationStatus(true);
  }

  @action
  async scriptRegExp(url: string) {
    console.log('regexp');

    await this.logicStore.gitPull(url); // 1 pull

    const f = v =>
      v.replace(this.logicStore?.actionRegExp, this.logicStore?.actionData);

    await this.logicStore.goCircularRepo(v => this.logicStore.modifyFile(v, f));

    await this.logicStore.gitAdd();
    await this.logicStore.gitCommit(); // 4 commit
    await this.logicStore.gitPush(url);

    // notification
    await this.setNotificationMessage('Успешно');
    this.setNotificationStatus(true);
  }

  @action
  async scriptTest(url: string) {
    console.log('test');

    await this.logicStore.gitPull(url); // 1 pull
    await this.logicStore.readRepo(); // 2 show file in console

    // const entries = fs.globSync(['*'], { stats: true, cwd: '/dir' });
    // console.log(entries);

    // await this.logicStore.writeRepo('devopsTest', this.logicStore?.actionData || 'Тест'); // 3 add new file
    // await this.logicStore.gitAdd();
    // await this.logicStore.gitCommit(); // 4 commit
    // await this.logicStore.gitPush(url); // 5 push

    // notification
    await this.setNotificationMessage('Успешно');
    this.setNotificationStatus(true);
  }

  @action
  async setNotificationStatus(status?: boolean) {
    this.notificationStatus = status;
  }

  @action
  async setNotificationMessage(notificationMessage?: string) {
    this.notificationMessage = notificationMessage;
  }

  @action
  async start() {
    if (!this.validation()) return;
    console.log('action', this.logicStore.actionType);
    const f = {
      regexp: u => this.scriptRegExp(u),
      test: u => this.scriptTest(u),
      code: u => this.scriptСode(u)
    }[this.logicStore.actionType || ''];

    console.log(f, typeof f);
    for (const url of this.logicStore.urlsCollection || []) {
      await f(url);
    }
  }

  validation() {
    const validate =
      this.logicStore.login &&
      this.logicStore.password &&
      this.logicStore.login &&
      this.logicStore.email &&
      this.logicStore.commitInfo &&
      this.logicStore.actionData;
    if (!validate) {
      this.setNotificationStatus(true);
      return false;
    }
    return true;
  }
}
