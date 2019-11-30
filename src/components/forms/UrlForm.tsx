import { Grid, Icon, IconButton } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { StoresContext } from '~/core/stores';
import { CommonForm } from './CommonForm';

const CusstomIcon = styled(Icon)`
  font-size: 30;
  :hover {
    color: green;
  }
`;

export const UrlForm = () => {
  const { logicStore } = useContext(StoresContext);
  const [value, setValue] = useState('');

  return (
    <Grid container spacing={1} alignItems="flex-end" justify="space-around">
      <Grid item xs={11}>
        <CommonForm
          label="Git URL"
          fullWidth
          setStoreValue={v => setValue(v)}
          margin="none"
        />
      </Grid>
      <Grid item>
        <IconButton
          aria-label="add"
          color="primary"
          size="small"
          onClick={() => logicStore.pushUrl(value)}
        >
          <CusstomIcon>add_circle_outline</CusstomIcon>
        </IconButton>
      </Grid>
    </Grid>
  );
};
