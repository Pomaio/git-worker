import { createContext } from 'react';
import { VariablesStore } from './VariablesStore';
import { LogicStore } from './LogicStore';
import { ScriptStore } from '../../components/forms/ScriptStore';

const infoStore = new VariablesStore();
const logicStore = new LogicStore();
const scriptStore = new ScriptStore(logicStore);

const StoresContext = createContext({
  infoStore,
  logicStore,
  scriptStore
});

export { StoresContext, VariablesStore as InfoStore, LogicStore, ScriptStore };
