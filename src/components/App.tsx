import { Button, Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useContext } from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';
import { StoresContext } from '~/core/stores';
import { ActionField } from './containers/ActionField';
import { AuthField } from './containers/AuthField';
import { CommitField } from './containers/CommitField';

const StyledContainer = styled(Container)`
  background: white;
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
  const { scriptStore } = useContext(StoresContext);

  console.log('rendder app');
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
              onClick={() => scriptStore.testScript()}
            >
              GO
            </Button>
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
});
