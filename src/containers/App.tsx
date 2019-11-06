import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';
import { ActionField } from './ActionField';
import { AdressField } from './AdressField';
import { AuthField } from './AuthField';
import { CommitField } from './CommitField';

const StyledContainer = styled(Container)`
  background: white;
  min-height: 100vh;
`;
export const App = hot(() => {
  return (
    <>
      <StyledContainer maxWidth="md">
        <Grid container direction="column">
          <AdressField />
          <AuthField />
          <ActionField />
          <CommitField />
        </Grid>
      </StyledContainer>
    </>
  );
});
