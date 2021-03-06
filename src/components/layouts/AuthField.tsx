import { Box, Grid, Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { UrlsList } from '~/components/UrlsList';
import { CommonForm } from '~/components/forms/CommonForm';
import { UrlForm } from '~/components/forms/UrlForm';
import { StoresContext } from '~/core/stores';

export const AuthField = observer(() => {
  const { formStore } = useContext(StoresContext);
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
            required
            margin="dense"
            variant="outlined"
            value={formStore.login || ''}
            setStoreValue={v => formStore.setLogin(v)}
          />
        </Grid>
        <Grid item xs={6}>
          <CommonForm
            fullWidth
            label="Пароль"
            required
            margin="dense"
            variant="outlined"
            value={formStore.password || ''}
            setStoreValue={v => formStore.setPassword(v)}
          />
        </Grid>
      </Grid>
      <UrlsList />
      <UrlForm />
    </Box>
  );
});
