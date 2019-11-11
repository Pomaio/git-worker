import { createContext } from 'react';
import { InfoStore } from './InfoStore';
import { LogicStore } from './LogicStore';

const infoStore = new InfoStore();
const logicStore = new LogicStore();

const StoresContext = createContext({
  infoStore,
  logicStore
});

export { StoresContext, InfoStore, LogicStore };
