import { Grid, Icon } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { StoresContext } from '~/core/stores';
import { CommonForm } from './CommonForm';

const CusstomIcon = styled(Icon)`
  font-size: 30;
  :hover {
    color: #3f51b5;
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
        <CusstomIcon
          onClick={() => {
            logicStore.pushUrl(value);
          }}
          className="mat-icon-main"
        >
          add_circle_outline
        </CusstomIcon>
      </Grid>
    </Grid>
  );
};
