import { action, observable } from 'mobx';
import { glob, globMatch, translateVar } from '~/utils';
import { GitStore } from './GitStore';

const saferEval = require('safer-eval');

export class ScriptStore {
  // tslint:disable: member-ordering

  @observable
  notificationMessage?: string;

  @observable
  notificationStatus?: boolean;

  constructor(protected logicStore: GitStore) {}

  @action
  async scriptСode(url: string) {
    const fn = saferEval(this.logicStore.actionData || '');
    await this.logicStore.modifyScript(url, fn);
  }

  @action
  async scriptRegExp(url: string) {
    const pattern = this.logicStore.actionAppliedFile
      ?.split(',')
      .map(v => v.trim()) || ['*'];

    const f = v =>
      v.replace(this.logicStore?.actionRegExp, this.logicStore?.actionData);
    await this.logicStore.goRepo(pathFile => {
      console.log(pathFile, pattern, globMatch(pathFile, pattern));
      globMatch(pathFile, pattern)
        ? this.logicStore.modifyFile(pathFile, f)
        : null;
    });
  }

  @action
  async scriptAddFile(url: string) {
    this.logicStore?.actionAppliedFile && this.logicStore?.actionData
      ? await this.logicStore.addTestFile(
          this.logicStore?.actionAppliedFile,
          this.logicStore?.actionData
        )
      : await this.setNotificationStatus(true);
  }

  @action
  async scriptStart(script: any, url: string, progress?: string) {
    await this.logicStore.clone(url); // 1 pull

    await script(url); // 2 run scenario

    await this.logicStore.add(); // 3 add .
    await this.logicStore.commit(); // 4 commit
    await this.logicStore.push(url); // 5 push

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

    this.logicStore.saveFormVariables();

    const f = {
      regexp: u => this.scriptRegExp(u),
      add: u => this.scriptAddFile(u),
      code: u => this.scriptСode(u)
    }[this.logicStore.actionType || ''];

    this.logicStore.urlCollection?.forEach(async (url, i) => {
      const progress = `${i + 1}/${this.logicStore.urlCollection?.length}`;
      await this.scriptStart(f, url, progress);
    });
    // let i = 0;
    // for (const url of this.logicStore.urlCollection || []) {
    //   const progress = `${++i}/${this.logicStore.urlCollection?.length}`;
    //   await this.scriptStart(f, url, progress);
    // }
  }
  @action
  async test() {
    let paths = new Array<string>();
    await this.logicStore.clone((this.logicStore.urlCollection || [''])[0]);
    await this.logicStore.goRepo();
    // await this.logicStore.goCircularRepo(pathFile => paths.push(pathFile));

    // const pattern = this.logicStore.actionAppliedFile
    //   ?.split(',')
    //   .map(v => v.trim()) || ['*'];

    // const r = glob(paths, pattern);
    // r?.forEach(v => console.log(v)); // выволдит массив нужных файлов

    // paths.forEach(v => console.log(v, globMatch(v, pattern))); // каждый раз проверяет
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
