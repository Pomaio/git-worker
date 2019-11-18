import { Box, Grid, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { CollapseRow } from '~/components/CollapseRow';
import { CommonForm } from '~/components/CommonForm';
import { UrlForm } from '~/components/UrlForm';
import { StoresContext } from '~/core/stores';

export const AuthField = () => {
  const { infoStore } = useContext(StoresContext);
  return (
    <Box>
      <Typography variant="h5" component="h5">
        Данные авторизации и список Url
      </Typography>
      <Grid container spacing={1} alignItems="flex-end" justify="flex-start">
        <Grid item xs={6}>
          <CommonForm
            fullWidth
            label="Логин"
            margin="dense"
            variant="outlined"
            setStoreValue={infoStore.setLogin}
          />
        </Grid>
        <Grid item xs={6}>
          <CommonForm
            fullWidth
            label="Пароль"
            margin="dense"
            variant="outlined"
            setStoreValue={infoStore.setPassword}
          />
        </Grid>
      </Grid>
      <CollapseRow />
      <UrlForm />
    </Box>
  );
};
