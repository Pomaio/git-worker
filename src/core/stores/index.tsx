import { createContext } from 'react';
import { FormStore } from './FormStore';
import { GitStore } from './GitStore';
import { ScriptStore } from './ScriptStore';

const infoStore = new FormStore();
const logicStore = new GitStore();
const scriptStore = new ScriptStore(logicStore);

const StoresContext = createContext({
  infoStore,
  logicStore,
  scriptStore
});

export { StoresContext, FormStore, GitStore, ScriptStore };
