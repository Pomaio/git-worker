import { Box, Grid, Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { CollapseRow } from '~/components/CollapseRow';
import { CommonForm } from '~/components/forms/CommonForm';
import { UrlForm } from '~/components/forms/UrlForm';
import { StoresContext } from '~/core/stores';

export const AuthField = observer(() => {
  const { logicStore } = useContext(StoresContext);
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
            value={logicStore.login || ''}
            setStoreValue={v => logicStore.setLogin(v)}
          />
        </Grid>
        <Grid item xs={6}>
          <CommonForm
            fullWidth
            label="Пароль"
            required
            margin="dense"
            variant="outlined"
            value={logicStore.password || ''}
            setStoreValue={v => logicStore.setPassword(v)}
          />
        </Grid>
      </Grid>
      <CollapseRow />
      <UrlForm />
    </Box>
  );
});
