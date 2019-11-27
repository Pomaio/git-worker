import { createContext } from 'react';
import { LogicStore } from './LogicStore';
import { ScriptStore } from './ScriptStore';
import { VariablesStore } from './VariablesStore';

const infoStore = new VariablesStore();
const logicStore = new LogicStore();
const scriptStore = new ScriptStore(logicStore);

const StoresContext = createContext({
  infoStore,
  logicStore,
  scriptStore
});

export { StoresContext, VariablesStore as InfoStore, LogicStore, ScriptStore };
