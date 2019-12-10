import { action, observable } from 'mobx';
import { isAbsolute, join } from 'path';
import { globMatch, translateVar } from '~/utils';
import { getUnvalidFormVar, isValidForm } from '~/utils/validator';
import { FormStore } from './FormStore';
import { GitStore } from './GitStore';
import { LogStore } from './LogStore';

const saferEval = require('safer-eval');

export class ScenarioStore {
  constructor(
    protected logStore: LogStore,
    protected gitStore: GitStore,
    protected formStore: FormStore
  ) {}

  @action
  async scriptAddFile(url: string) {
    this.logStore.log(
      'info',
      `Creating file ${this.formStore?.actionAppliedFile}`
    );
    if (this.formStore?.actionAppliedFile && this.formStore?.actionData) {
      await this.gitStore.createFile(
        this.formStore?.actionAppliedFile,
        this.formStore?.actionData
      );
    }
  }

  @action
  async scriptRegExp(url: string) {
    const pattern = this.formStore.actionAppliedFile
      ?.split(',')
      .map(v => v.trim())
      .map(v => (isAbsolute(v) ? v : join('/', v))) || ['*'];

    const fn = v =>
      v.replace(this.formStore?.actionRegExp, this.formStore?.actionData);

    await this.gitStore.forEachFile(async path => {
      globMatch(path, pattern) ? this.gitStore.modifyFile(path, fn) : null;
    });
  }

  @action
  async scriptStart(script: any, url: string) {
    try {
      this.logStore.log('', '');
      this.gitStore.reset();
      this.logStore.log('info', `Cloning into ${url}`);
      await this.gitStore.clone(url);
      this.logStore.log('info', `Staring scenario`);
      await script(url);
      this.logStore.log('info', `Adding files`);
      await this.gitStore.add();
      const hasUnstaged = await this.gitStore.hasUnstaged();
      if (hasUnstaged) {
        this.logStore.log('info', `Has changes, committing`);
        await this.gitStore.commit();
        this.logStore.log('info', `Pushing`);
        await this.gitStore.push(url);
      } else {
        this.logStore.log('warning', `Everything is up-to-date, skipping`);
      }
      this.logStore.log('good', `Finished ${url}\n`);
    } catch (e) {
      this.logStore.log('error', `\n${e.toString()}\n`);
    }
  }

  @action
  async scriptСode(url: string) {
    const fn = saferEval(this.formStore.actionData || '');
    await this.gitStore.modifyScript(url, fn);
  }

  @action
  async start() {
    if (!(await this.validation())) {
      return;
    }
    this.formStore.saveFormVariables();
    const fn = {
      regexp: u => this.scriptRegExp(u),
      add: u => this.scriptAddFile(u),
      code: u => this.scriptСode(u)
    }[this.formStore.actionType || ''];

    for (const url of this.formStore.urlCollection || []) {
      await this.scriptStart(fn, url);
    }
  }

  async validation() {
    const isValid = isValidForm(this.formStore);
    if (!isValid) {
      this.logStore.log(
        'warning',
        'Поля не заполнены: ' + getUnvalidFormVar(this.formStore).join(', ')
      );
    }
    return isValid;
  }
}
