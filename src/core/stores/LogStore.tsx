import { action, observable } from 'mobx';

export class LogStore {
  @observable
  data = 'Ready to start\n';

  @action
  log(level: string, data: string) {
    this.data += '[' + level + '] ' + data + '\n';
  }
}
