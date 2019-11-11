import { Grid, Icon, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { StoresContext } from '~/core/stores';

export const FormComponent = () => {
  const { infoStore } = useContext(StoresContext);
  const [value, setValue] = useState('');

  return (
    <Grid container spacing={1} alignItems="flex-end" justify="flex-start">
      <Grid item xs={11}>
        <TextField
          label="Git URL"
          fullWidth
          onChange={e => {
            setValue(e.target.value);
          }}
          margin="none"
          name="qwert"
        />
      </Grid>
      <Grid item xs={1}>
        <Icon
          style={{ fontSize: 30 }}
          onClick={() => {
            infoStore.pushUrl(value);
          }}
          className="mat-icon-main"
        >
          add_circle_outline
        </Icon>
      </Grid>
    </Grid>
  );
};
