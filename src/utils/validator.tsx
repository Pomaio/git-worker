import { translateVar } from './translateVar';

const requiredVariables = [
  'login',
  'password',
  'email',
  'commitInfo',
  'actionData'
];
export const isValidForm = (store: any): boolean => {
  return requiredVariables.every(v => store[v] && store[v] !== '');
};

export const getUnvalidFormVar = (store: any): string[] => {
  const info = requiredVariables.filter(v => !store[v] || store[v] == '');
  return info.map(v => translateVar(v));
};
