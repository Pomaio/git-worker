import { FormControl, Grid, TextField } from '@material-ui/core';
import PostAdd from '@material-ui/icons/PostAdd';
import React, { useState } from 'react';
import { useDebounce } from 'react-use';

interface InputProps {
  icon?: any;
  initValue?: string;
  onSubmit?: any;
  placeholder?: string;
}

export const FormField = ({
  icon,
  onSubmit,
  initValue,
  placeholder
}: InputProps) => {
  const [value, setValue] = useState(initValue || '');
  useDebounce(
    () => {
      console.log(value);
      // onChange(value);
    },
    300,
    [value]
  );
  return (
    <FormControl fullWidth>
      <Grid container spacing={1} alignItems="flex-end" justify="flex-start">
        <Grid item xs={11}>
          <TextField
            id="input-with-icon-grid"
            label="With a grid"
            // className={classes.textField}
            onChange={e => setValue(e.target.value)}
            fullWidth
            margin="none"
          />
        </Grid>
        <Grid item xs={1}>
          <PostAdd />
        </Grid>
      </Grid>
    </FormControl>
  );
};
