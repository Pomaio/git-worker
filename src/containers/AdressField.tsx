import { Box, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { FormComponent } from '~/components/FormComponent';
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

export const AdressField = () => {
  return (
    <StyledBox>
      <Typography variant="h5" component="h5">
        Git проекты
      </Typography>
      <FormComponent />
      <CollapseRow />
    </StyledBox>
  );
};
