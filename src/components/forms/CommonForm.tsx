import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

type FormProps = TextFieldProps & { setStoreValue?: any };

export const CommonForm = ({ setStoreValue, ...props }: FormProps) => {
  const [value, setValue] = useState('');
  if (!setStoreValue)
    console.warn(props.label, '<---- нет переменной в сторе для этого поля');
  useDebounce(() => (setStoreValue ? setStoreValue(value) : ''), 500, [value]);
  useEffect(() => {
    props.value ? setStoreValue(value) : '';
  });
  return (
    <TextField
      fullWidth
      onChange={e => setValue(e.target.value)}
      error={props.required && value === '' ? true : false}
      {...props}
    />
  );
};
