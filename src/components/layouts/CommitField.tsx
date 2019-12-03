import React, { useContext } from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { CommonForm } from '~/components/forms/CommonForm';
import { StoresContext } from '~/core/stores';

export const CommitField = observer(() => {
  const { gitStore } = useContext(StoresContext);
  return (
    <Box>
      <Typography variant="h5" component="h5">
        Информация коммита:
      </Typography>
      <Grid container spacing={1} alignItems="flex-end" justify="flex-start">
        <Grid item xs={6}>
          <CommonForm
            fullWidth
            label="Username (default: логин)"
            margin="dense"
            variant="outlined"
            value={gitStore.username || ''}
            setStoreValue={v => gitStore.setUsername(v)}
          />
        </Grid>
        <Grid item xs={6}>
          <CommonForm
            fullWidth
            label="Email"
            required
            margin="dense"
            variant="outlined"
            value={gitStore.email || ''}
            setStoreValue={v => gitStore.setEmail(v)}
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
          value={gitStore.commitInfo}
          setStoreValue={v => gitStore.setCommitInfo(v)}
        />
      </Grid>
    </Box>
  );
});
