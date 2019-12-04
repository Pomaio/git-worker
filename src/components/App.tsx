import { Button, Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useContext, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';
import { StoresContext } from '~/core/stores';
import { LogHolder } from './LogHolder';
import { Notification } from './Notification';
import { ActionField } from './layouts/ActionField';
import { AuthField } from './layouts/AuthField';
import { CommitField } from './layouts/CommitField';

const StyledContainer = styled(Container)`
  background: white;
  padding-bottom: 20px;
  min-height: 100vh;
  .MuiBox-root {
    margin: 25px 0;
  }
  .MuiTypography-root {
    padding-bottom: 20px;
  }
  .submit__button {
    padding-bottom: 30px;
  }
`;

export const App = hot(() => {
  const { scenarioStore, gitStore } = useContext(StoresContext);
  useEffect(() => gitStore.extractVariables(), []);
  return (
    <>
      <StyledContainer maxWidth="md">
        <Grid container direction="column">
          <AuthField />
          <ActionField />
          <CommitField />
          <Grid
            container
            spacing={1}
            alignItems="flex-end"
            justify="flex-end"
            className="submit__button"
          >
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => {
                scenarioStore.start();
              }}
            >
              GO
            </Button>
          </Grid>
        </Grid>
        <LogHolder />
      </StyledContainer>
      <Notification />
    </>
  );
});
