import React, { useContext } from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { CommonForm } from '~/components/forms/CommonForm';
import { StoresContext } from '~/core/stores';

export const CommitField = () => {
  const { logicStore } = useContext(StoresContext);
  return (
    <Box>
      <Typography variant="h5" component="h5">
        Коммит:
      </Typography>
      <Grid container spacing={1} alignItems="flex-end" justify="flex-start">
        <Grid item xs={6}>
          <CommonForm
            fullWidth
            label="Username"
            placeholder="по умолчанию будет взят логин"
            margin="dense"
            variant="outlined"
            setStoreValue={v => logicStore.setUsername(v)}
          />
        </Grid>
        <Grid item xs={6}>
          <CommonForm
            fullWidth
            label="Email"
            required
            margin="dense"
            variant="outlined"
            setStoreValue={v => logicStore.setEmail(v)}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end" justify="flex-start">
        <CommonForm
          id="outlined-multiline-static"
          label="Сообщение коммита"
          required
          placeholder="Многие из вас знакомы с достоинствами программиста.
           Их всего три, и разумеется это: лень, нетерпеливость и гордыня."
          multiline
          fullWidth
          margin="normal"
          variant="outlined"
          setStoreValue={v => logicStore.setCommitInfo(v)}
        />
      </Grid>
    </Box>
  );
};
