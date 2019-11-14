import { Button, Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useContext } from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';
import { StoresContext } from '~/core/stores';
import { ActionField } from './ActionField';
import { AdressField } from './AdressField';
import { AuthField } from './AuthField';
import { CommitField } from './CommitField';

const StyledContainer = styled(Container)`
  background: white;
  min-height: 100vh;
`;
export const App = hot(() => {
  const { logicStore } = useContext(StoresContext);
  return (
    <>
      <Button variant="contained" onClick={() => logicStore.writeRepo()}>
        Write
      </Button>
      <Button variant="contained" onClick={() => logicStore.readRepo()}>
        Read
      </Button>
      <Button variant="contained" onClick={() => logicStore.fetch()}>
        Fetch
      </Button>
      <Button variant="contained" onClick={() => logicStore.addTest()}>
        AddFolder
      </Button>
      <Button variant="contained" onClick={() => logicStore.commit()}>
        Commit
      </Button>
      <Button variant="contained" onClick={() => logicStore.push()}>
        Push
      </Button>
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
