import { createContext } from 'react';
import { InfoStore } from './InfoStore';
import { LogicStore } from './LogicStore';
import { ScriptStore } from './ScriptStore';

const infoStore = new InfoStore();
const logicStore = new LogicStore();
const scriptStore = new ScriptStore(logicStore);

const StoresContext = createContext({
  infoStore,
  logicStore,
  scriptStore
});

export { StoresContext, InfoStore, LogicStore, ScriptStore };
