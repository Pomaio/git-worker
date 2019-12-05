export const paint = (status: string) => {
  return (
    {
      error: 'red',
      warning: '#c7c706',
      good: 'green',
      info: '#ababab'
    }[status] || 'black'
  );
};
