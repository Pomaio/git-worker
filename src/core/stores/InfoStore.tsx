import { action, observable } from 'mobx';

export class InfoStore {
  @observable
  collectionUrl?: string[];

  @action
  reset() {
    this.collectionUrl = undefined;
  }

  @action
  setCollectionUrl(collectionUrl: string[]) {
    this.collectionUrl = collectionUrl;
  }
}
