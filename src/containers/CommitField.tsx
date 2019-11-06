import React from 'react';

import { Box, Typography, Grid, TextField, Icon } from '@material-ui/core';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  margin: 30px 0;
  .MuiBox-root {
    margin: 0;
  }
`;

export const CommitField = () => {
  return (
    <StyledBox>
      <Typography variant="h5" component="h5">
        Коммит:
      </Typography>
      <Grid container alignItems="flex-end" justify="flex-start">
        <TextField
          label="Название коммита"
          fullWidth
          margin="normal"
          name="qwert"
        />

        <TextField
          id="outlined-multiline-static"
          label="Сообщение коммита"
          multiline
          fullWidth
          margin="normal"
          variant="outlined"
        />
      </Grid>
    </StyledBox>
  );
};
