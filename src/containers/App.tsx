import { Button, Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useContext } from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';
import { StoresContext } from '~/core/stores';
import { ActionField } from './ActionField';
import { AuthField } from './AuthField';
import { CommitField } from './CommitField';

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
  const { logicStore } = useContext(StoresContext);
  return (
    <>
      <StyledContainer maxWidth="md">
        <Grid container justify="space-around">
          <Button variant="contained" onClick={() => logicStore.gitPull()}>
            Pull
          </Button>
          <Button variant="contained" onClick={() => logicStore.readRepo()}>
            ShowContent
          </Button>
          <Button variant="contained" onClick={() => logicStore.writeRepo()}>
            Add txt file
          </Button>
          <Button variant="contained" onClick={() => logicStore.gitCommit()}>
            Commit
          </Button>
          <Button variant="contained" onClick={() => logicStore.gitPush()}>
            Push
          </Button>
          <Button variant="contained" onClick={() => logicStore.cleanFolder()}>
            CleanFolder
          </Button>
        </Grid>
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
            <Button variant="outlined" color="secondary" size="large">
              GO
            </Button>
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
});
