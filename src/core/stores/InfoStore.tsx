import { action, observable } from 'mobx';

export class InfoStore {
  @observable
  commitInfo?: string;
  @observable
  login?: string;
  @observable
  password?: string;

  @observable
  urlsCollection?: string[];

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
  @action
  reset() {
    console.log('reset');
    this.urlsCollection = undefined;
  }
  @action
  setCommitInfo(commitInfo?: string) {
    this.commitInfo = commitInfo;
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
}
