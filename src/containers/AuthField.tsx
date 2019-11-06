import { Box, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  margin: 30px 0;

  .MuiBox-root {
    margin: 0;
  }
  .MuiTypography-root {
    padding-bottom: 20px;
  }
`;
export const AuthField = () => {
  return (
    <StyledBox>
      <Typography variant="h5" component="h5">
        Данные авторизации
      </Typography>
      <Grid container spacing={1} alignItems="flex-end" justify="flex-start">
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Логин"
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Пароль"
            margin="dense"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </StyledBox>
  );
};
