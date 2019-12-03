import { action, observable } from 'mobx';

export class FormStore {
  @observable
  actionAppliedFile?: string;

  @observable
  actionData?: string;

  @observable
  actionRegExp?: RegExp;

  @observable
  actionType?: string;

  @observable
  commitInfo?: string;

  @observable
  email?: string;

  @observable
  login?: string;

  @observable
  password?: string;

  savedVariable = ['login', 'password', 'email', 'username', 'urlCollection'];

  @observable
  urlCollection?: string[];

  @observable
  username?: string;

  @action
  deleteUrl(url: string) {
    const r = (this.urlCollection || []).filter(elem => elem !== url);
    if (r && r !== []) {
      this.setLocalStorage('urlCollection', r);
      this.setUrlCollection(r);
    }
  }

  @action
  extractVariables() {
    const fnPick = (name: string) =>
      ({
        login: v => this.setLogin(v),
        password: v => this.setPassword(v),
        email: v => this.setEmail(v),
        username: v => this.setUsername(v),
        urlCollection: v => this.setUrlCollection(v)
      }[name]);
    this.savedVariable.forEach(v => {
      const r = localStorage.getItem(v);
      if (r) {
        fnPick(v)(JSON.parse(r));
      }
    });
  }

  @action
  pushUrl(url: string) {
    if (url !== '') {
      if (!this.urlCollection?.includes(url)) {
        this.urlCollection = [...(this.urlCollection || []), url];
        this.setLocalStorage('urlCollection', this.urlCollection);
      } else {
        console.warn('Такой url уже имеется в списке!');
      }
    }
  }
  @action
  resetActionData() {
    this.actionData = '';
    this.actionAppliedFile = '';
    this.actionRegExp = undefined;
  }

  @action
  saveFormVariables() {
    this.savedVariable.forEach(v => {
      this.setLocalStorage(v, this[v]);
    });
  }

  @action
  setActionAppliedFile(actionAppliedFile?: string) {
    this.actionAppliedFile = actionAppliedFile;
  }

  @action
  setActionData(actionData?: string) {
    this.actionData = actionData;
  }

  @action
  setActionRegExp(actionRegExp?: RegExp) {
    this.actionRegExp = actionRegExp;
  }

  @action
  setActionType(actionType?: string) {
    this.actionType = actionType;
  }

  @action
  setCommitInfo(commitInfo?: string) {
    this.commitInfo = commitInfo;
  }

  @action
  setEmail(email?: string) {
    this.email = email;
  }

  @action
  setLocalStorage(name: string, value: any) {
    if (value) {
      localStorage.setItem(name, JSON.stringify(value));
    }
  }

  @action
  setLogin(login?: string) {
    this.login = login;
  }

  @action
  setPassword(password?: string) {
    this.password = password;
  }

  @action
  setUrlCollection(urlCollection?: string[]) {
    this.urlCollection = [...(urlCollection || [])];
  }

  @action
  setUsername(username?: string) {
    this.username = username;
  }
}
