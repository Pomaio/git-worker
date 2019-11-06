import React, { useState } from 'react';

import { Box, Grid, Icon, TextField, Typography } from '@material-ui/core';
// tslint:disable-next-line: import-blacklist
import styled from 'styled-components';
import { CollapseRow } from '../components/CollapseRow';

const StyledBox = styled(Box)`
  margin: 30px 0;
  .MuiBox-root {
    margin: 0;
  }
  .MuiTypography-root {
    padding-bottom: 20px;
  }
  .mat-icon-main:hover {
    color: rgb(60, 60, 200);
    cursor: pointer;
  }
`;

const pushtoLocalStorage = (value: string) => {
  let urls = localStorage.getItem('URLS') || '';
  if (urls !== '') {
    let res = urls.split('/..../');
    res.push(value);
    urls = res.join('/..../');
    localStorage.setItem('URLS', urls);
  } else {
    localStorage.setItem('URLS', value);
  }
};

export const AdressField = () => {
  const [value, setValue] = useState('');
  return (
    <StyledBox>
      <Typography variant="h5" component="h5">
        Git проекты
      </Typography>
      <Grid container spacing={1} alignItems="flex-end" justify="flex-start">
        <Grid item xs={11}>
          <TextField
            inputProps={{ form: 'form-git' }}
            id="input-git-url"
            label="Git URL"
            fullWidth
            onChange={e => setValue(e.target.value)}
            margin="none"
            name="qwert"
          />
        </Grid>
        <Grid item xs={1}>
          <Icon
            style={{ fontSize: 30 }}
            onClick={() => {
              pushtoLocalStorage(value);
            }}
            className="mat-icon-main"
          >
            add_circle_outline
          </Icon>
        </Grid>
      </Grid>
      <CollapseRow />
    </StyledBox>
  );
};
