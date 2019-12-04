import { createContext } from 'react';
import { FormStore } from './FormStore';
import { GitStore } from './GitStore';
import { LogStore } from './LogStore';
import { ScenarioStore } from './ScenarioStore';

const logStore = new LogStore();
const formStore = new FormStore();
const gitStore = new GitStore();
const scenarioStore = new ScenarioStore(logStore, gitStore);

const StoresContext = createContext({
  logStore,
  formStore,
  gitStore,
  scenarioStore
});

export { LogStore, StoresContext, FormStore, GitStore, ScenarioStore };
