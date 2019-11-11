import { action, observable } from 'mobx';

export class InfoStore {
  @observable
  collectionUrl?: string[];

  des = '/..../';

  @action
  async deletUrl(url: string) {
    const r = await (this.collectionUrl &&
      this.collectionUrl.filter(elem => elem === url));
    this.setLocalStorage(r);
    this.setCollectionUrl(r);
  }

  @action
  async fetchUrls() {
    const r = await localStorage.getItem('URLS');
    if (r) this.setCollectionUrl(r.split(this.des));
  }
  @action
  async pushUrl(url: string) {
    const r = await this.collectionUrl;
    if (r && url != '') {
      r.push(url);
      this.setLocalStorage(r);
      this.setCollectionUrl(r);
    } else {
      this.setLocalStorage([url]);
      this.setCollectionUrl([url]);
    }
  }
  @action
  reset() {
    this.collectionUrl = undefined;
  }

  @action
  setCollectionUrl(collectionUrl?: string[]) {
    this.collectionUrl = collectionUrl;
  }
  @action
  setLocalStorage(collectionUrl?: string[]) {
    if (collectionUrl) {
      localStorage.setItem('URLS', collectionUrl.join(this.des));
    }
  }
}
