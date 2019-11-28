export const translateVar = (variable: string): string => {
  return {
    login: 'Логин',
    password: 'Пароль',
    email: 'Почта',
    commitInfo: 'Сообщение коммита',
    actionData: 'Действие'
  }[variable];
};
