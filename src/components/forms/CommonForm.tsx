import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import React, { useEffect, useState } from 'react';

type FormProps = TextFieldProps & { setStoreValue: any; value: any };

export const CommonForm = ({ setStoreValue, value, ...props }: FormProps) => {
  if (!setStoreValue) {
    console.warn(props.label, '<---- нет переменной в сторе для этого поля');
  }

  useEffect(() => {
    value ? setStoreValue(value) : '';
  });

  return (
    <TextField
      fullWidth
      value={value || ''}
      onChange={e => setStoreValue(e.target.value)}
      error={props.required && value === '' ? true : false}
      {...props}
    />
  );
};
