import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import React, { useState } from 'react';
import { useDebounce } from 'react-use';

type FormProps = TextFieldProps & { setStoreValue?: any };

export const CommonForm = ({ setStoreValue, ...props }: FormProps) => {
  const [value, setValue] = useState('');
  if (!setStoreValue)
    console.log(props.label, '<---- нет переменной в сторе для этого поля');
  useDebounce(() => (setStoreValue ? setStoreValue(value) : null), 500, [
    value
  ]);
  return (
    <TextField fullWidth onChange={e => setValue(e.target.value)} {...props} />
  );
};
