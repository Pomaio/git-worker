import { Grid, Icon } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { StoresContext } from '~/core/stores';
import { CommonForm } from './CommonForm';

export const UrlForm = () => {
  const { infoStore } = useContext(StoresContext);
  const [value, setValue] = useState('');

  return (
    <Grid container spacing={1} alignItems="flex-end" justify="space-around">
      <Grid item xs={11}>
        <CommonForm
          label="Git URL"
          fullWidth
          setStoreValue={setValue}
          margin="none"
        />
      </Grid>
      <Grid item>
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
