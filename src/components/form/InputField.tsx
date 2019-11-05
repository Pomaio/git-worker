import React, { useState } from 'react';
import { useDebounce } from 'react-use';

interface InputProps {
  icon?: string;
  initValue?: string;
  onChange: any;
  placeholder?: string;
}

export const InputField = ({
  icon,
  onChange,
  initValue,
  placeholder
}: InputProps) => {
  const [value, setValue] = useState(initValue || '');
  useDebounce(
    () => {
      // onChange(value);
    },
    300,
    [value]
  );
  return (
    <form
      onSubmit={() => {
        console.log('url');
      }}
    >
      <input></input>
    </form>
  );
};
