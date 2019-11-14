import { action, observable } from 'mobx';

export class InfoStore {
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
  setLocalStorage(urlsCollection?: string[]) {
    if (urlsCollection) {
      localStorage.setItem('URLS', JSON.stringify(urlsCollection));
    }
  }

  @action
  setUrlsCollection(urlsCollection?: string[]) {
    this.urlsCollection = [...(urlsCollection || [])];
  }
}
