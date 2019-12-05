import { action, observable } from 'mobx';

export interface Log {
  data: string;
  status: string;
}
export class LogStore {
  @observable
  data: Log[] = [{ data: 'Ready to start', status: 'good' }];

  @action
  log(level: string, data: string) {
    this.data.push({ data, status: level });
  }
}
