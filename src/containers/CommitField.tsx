import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { CommonForm } from '~/components/CommonForm';

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
        {/* <CommonForm
          label="Название коммита"
          fullWidth
          margin="normal"
          name="qwert"
        /> */}

        <CommonForm
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
