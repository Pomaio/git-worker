import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { CommonForm } from '~/components/CommonForm';

export const CommitField = () => {
  return (
    <Box>
      <Typography variant="h5" component="h5">
        Коммит:
      </Typography>
      <Grid container alignItems="flex-end" justify="flex-start">
        <CommonForm
          id="outlined-multiline-static"
          label="Сообщение коммита"
          multiline
          fullWidth
          margin="normal"
          variant="outlined"
        />
      </Grid>
    </Box>
  );
};
