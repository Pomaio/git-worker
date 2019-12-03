import { createContext } from 'react';
import { FormStore } from './FormStore';
import { GitStore } from './GitStore';
import { ScenarioStore } from './ScenarioStore';

const formStore = new FormStore();
const gitStore = new GitStore();
const scenarioStore = new ScenarioStore(gitStore);

const StoresContext = createContext({
  formStore,
  gitStore,
  scenarioStore
});

export { StoresContext, FormStore, GitStore, ScenarioStore };
