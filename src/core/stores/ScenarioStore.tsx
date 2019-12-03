import { action, observable } from 'mobx';
import { isAbsolute, join } from 'path';
import { globMatch, translateVar } from '~/utils';
import { getUnvalidFormVar, isValidForm } from '~/utils/validator';
import { GitStore } from './GitStore';

const saferEval = require('safer-eval');

export class ScenarioStore {
  @observable
  notificationMessage?: string;

  @observable
  notificationStatus?: boolean;

  constructor(protected gitStore: GitStore) {}

  @action
  async scriptAddFile(url: string) {
    this.gitStore?.actionAppliedFile && this.gitStore?.actionData
      ? await this.gitStore.createFile(
          this.gitStore?.actionAppliedFile,
          this.gitStore?.actionData
        )
      : await this.setNotificationStatus(true);
  }

  @action
  async scriptRegExp(url: string) {
    const pattern = this.gitStore.actionAppliedFile
      ?.split(',')
      .map(v => v.trim())
      .map(v => (isAbsolute(v) ? v : join('/', v))) || ['*'];

    const fn = v =>
      v.replace(this.gitStore?.actionRegExp, this.gitStore?.actionData);

    await this.gitStore.forEachFile(async path => {
      globMatch(path, pattern) ? this.gitStore.modifyFile(path, fn) : null;
    });
  }

  @action
  async scriptStart(script: any, url: string, progress?: string) {
    await this.gitStore.clone(url);
    await script(url);
    await this.gitStore.add();
    const hasUnstaged = await this.gitStore.hasUnstaged();
    if (hasUnstaged) {
      await this.gitStore.commit();
      await this.gitStore.push(url);
    }
    await this.setNotificationMessage('Выполнено: ' + progress);
    this.setNotificationStatus(true);
  }

  @action
  async scriptСode(url: string) {
    const fn = saferEval(this.gitStore.actionData || '');
    await this.gitStore.modifyScript(url, fn);
  }

  @action
  async setNotificationMessage(notificationMessage?: string) {
    this.notificationMessage = notificationMessage;
  }

  @action
  async setNotificationStatus(status?: boolean) {
    this.notificationStatus = status;
  }

  @action
  async start() {
    if (!(await this.validation())) {
      return;
    }
    this.gitStore.saveFormVariables();
    const fn = {
      regexp: u => this.scriptRegExp(u),
      add: u => this.scriptAddFile(u),
      code: u => this.scriptСode(u)
    }[this.gitStore.actionType || ''];
    this.gitStore.urlCollection?.forEach(async (url, i) => {
      const progress = `${i + 1}/${this.gitStore.urlCollection?.length}`;
      await this.scriptStart(fn, url, progress);
    });
  }

  async validation() {
    const isValid = isValidForm(this.gitStore);
    if (!isValid) {
      await this.setNotificationMessage(
        'Поля не заполнены: ' + getUnvalidFormVar(this.gitStore).join(', ')
      );
      await this.setNotificationStatus(true);
    }
    return isValid;
  }
}
