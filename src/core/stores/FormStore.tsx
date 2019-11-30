import { action, observable } from 'mobx';

export class FormStore {
  //variable
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

  // action function
  @action
  deleteUrl(url: string) {
    const r = (this.urlCollection || []).filter(elem => elem !== url);
    if (r && r !== []) {
      this.setLocalStorage('urlCollection', r);
      this.setUrlCollection(r);
    }
  }
  @action
  fetchVariables() {
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
      if (r) fnPick(v)(JSON.parse(r));
    });
  }

  @action
  pushUrl(url: string) {
    if (url !== '') {
      this.urlCollection = [...(this.urlCollection || []), url];
      this.setLocalStorage('urlCollection', this.urlCollection);
    }
  }
  @action
  saveFormVariables() {
    this.savedVariable.forEach(v => {
      this.setLocalStorage(v, this[v]);
    });
  }

  // function set
  @action
  setActionAppliedFile(actionAppliedFile?: string) {
    if (actionAppliedFile) this.actionAppliedFile = actionAppliedFile;
  }

  @action
  setActionData(actionData?: string) {
    if (actionData) this.actionData = actionData;
  }

  @action
  setActionRegExp(actionRegExp?: RegExp) {
    if (actionRegExp) this.actionRegExp = actionRegExp;
  }

  @action
  setActionType(actionType?: string) {
    if (actionType) this.actionType = actionType;
  }

  @action
  setCommitInfo(commitInfo?: string) {
    this.commitInfo = commitInfo;
  }
  @action
  setEmail(email?: string) {
    if (email) this.email = email;
  }
  @action
  setLocalStorage(name: string, value: any) {
    if (value) {
      localStorage.setItem(name, JSON.stringify(value));
    }
  }

  @action
  setLogin(login?: string) {
    if (login) this.login = login;
  }
  @action
  setPassword(password?: string) {
    if (password) this.password = password;
  }

  @action
  setUrlCollection(urlCollection?: string[]) {
    this.urlCollection = [...(urlCollection || [])];
  }

  @action
  setUsername(username?: string) {
    if (username) this.username = username;
  }
}
