import { action, observable } from 'mobx';

export class VariablesStore {
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

  @observable
  urlsCollection?: string[];

  @observable
  username?: string;

  // action function for url
  @action
  async deleteUrl(url: string) {
    const r = (this.urlsCollection || []).filter(elem => elem !== url);
    if (r && r !== []) {
      this.setLocalStorage(r);
      this.setUrlsCollection(r);
    }
  }

  @action
  async fetchUrls() {
    const r = localStorage.getItem('URLS');
    if (r) this.setUrlsCollection(JSON.parse(r));
  }

  @action
  async pushUrl(url: string) {
    if (url !== '') {
      this.urlsCollection = [...(this.urlsCollection || []), url];
      this.setLocalStorage(this.urlsCollection);
    }
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
    if (email && email !== '') this.email = email;
  }
  @action
  setLocalStorage(urlsCollection?: string[]) {
    if (urlsCollection) {
      localStorage.setItem('URLS', JSON.stringify(urlsCollection));
    }
  }

  @action
  setLogin(login?: string) {
    if (login && login !== '') this.login = login;
  }
  @action
  setPassword(password?: string) {
    if (password && password !== '') this.password = password;
  }

  @action
  setUrlsCollection(urlsCollection?: string[]) {
    this.urlsCollection = [...(urlsCollection || [])];
  }

  @action
  setUsername(username?: string) {
    if (username && username !== '') this.username = username;
  }
}
