import { action, observable } from 'mobx';
import { glob, translateVar, globMatch } from '~/utils';
import { LogicStore } from './LogicStore';

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
    const pattern = this.logicStore.actionAppliedFile
      ?.split(',')
      .map(v => v.trim()) || ['*'];

    const f = saferEval(this.logicStore.actionData || '');
    await this.logicStore.goCircularRepo(pathFile =>
      globMatch(pathFile, pattern)
        ? this.logicStore.modifyFile(pathFile, f)
        : null
    );
  }

  @action
  async scriptRegExp(url: string) {
    const pattern = this.logicStore.actionAppliedFile
      ?.split(',')
      .map(v => v.trim()) || ['*'];

    const f = v =>
      v.replace(this.logicStore?.actionRegExp, this.logicStore?.actionData);
    await this.logicStore.goCircularRepo(pathFile =>
      globMatch(pathFile, pattern)
        ? this.logicStore.modifyFile(pathFile, f)
        : null
    );
  }

  @action
  async scriptTest(url: string) {
    await this.logicStore.readRepo();
    await this.logicStore.addTestFile(
      'devopsTest',
      this.logicStore?.actionData || 'Тест'
    );
  }

  @action
  async scriptStart(script: any, url: string, progress?: string) {
    await this.logicStore.gitPull(url); // 1 pull

    await script(url); // 2 run scenario

    await this.logicStore.gitAdd(); // 3 add .
    await this.logicStore.gitCommit(); // 4 commit
    await this.logicStore.gitPush(url); // 5 push

    // 6 notification
    await this.setNotificationMessage('Выполнено: ' + progress);
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
    if (!(await this.validation())) return;

    const f = {
      regexp: u => this.scriptRegExp(u),
      test: u => this.scriptTest(u),
      code: u => this.scriptСode(u)
    }[this.logicStore.actionType || ''];

    let i = 0;
    for (const url of this.logicStore.urlsCollection || []) {
      const progress = `${++i}/${this.logicStore.urlsCollection?.length}`;
      await this.scriptStart(f, url, progress);
    }
  }
  @action
  async test() {
    let paths = new Array<string>();
    await this.logicStore.gitPull((this.logicStore.urlsCollection || [''])[0]);
    await this.logicStore.goCircularRepo(pathFile => paths.push(pathFile));

    const pattern = this.logicStore.actionAppliedFile
      ?.split(',')
      .map(v => v.trim()) || ['*'];

    const r = glob(paths, pattern);
    r?.forEach(v => console.log(v)); // выволдит массив нужных файлов

    paths.forEach(v => console.log(v, globMatch(v, pattern))); // каждый раз проверяет
  }

  async validation() {
    const requiredVariables = [
      'login',
      'password',
      'email',
      'commitInfo',
      'actionData'
    ];

    if (
      requiredVariables.every(
        v => this.logicStore[v] && this.logicStore[v] !== ''
      )
    ) {
      return true;
    }
    // requiredVariables.forEach(v => console.log(v, this.logicStore[v]));
    const info = requiredVariables.filter(
      v => !this.logicStore[v] || this.logicStore[v] == ''
    );
    await this.setNotificationMessage(
      'Поля не заполнены: ' + info.map(v => translateVar(v)).join(', ')
    );
    await this.setNotificationStatus(true);

    return false;
  }
}
