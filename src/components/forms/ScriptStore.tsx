import { action } from 'mobx';
import { LogicStore } from '../../core/stores/LogicStore';

export class ScriptStore {
  constructor(protected logicStore: LogicStore) {}

  @action
  async testScript() {
    await this.logicStore.gitPull(this.logicStore?.urlsCollection?.[0] || ''); // 1 pull
    // await this.logicStore.readRepo(); // 2 show file in console
    await this.logicStore.writeRepo(
      this.logicStore?.actionType || 'test',
      'Its work'
    ); // 3 add new file
    await this.logicStore.gitCommit(); // 4 commit
    await this.logicStore.gitPush(this.logicStore?.urlsCollection?.[0] || ''); // 5 push
  }
}
