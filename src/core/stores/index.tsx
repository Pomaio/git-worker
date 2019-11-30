import { createContext } from 'react';
import { GitStore } from './GitStore';
import { ScriptStore } from './ScriptStore';
import { FormStore } from './FormStore';

const infoStore = new FormStore();
const logicStore = new GitStore();
const scriptStore = new ScriptStore(logicStore);

const StoresContext = createContext({
  infoStore,
  logicStore,
  scriptStore
});

export {
  StoresContext,
  FormStore as InfoStore,
  GitStore as LogicStore,
  ScriptStore
};
