import Container from '@material-ui/core/Container';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { AdressComponent } from './AdressComponent';

export const App = hot(() => {
  return (
    <>
      <Container maxWidth="md">
        <AdressComponent />
      </Container>
    </>
  );
});
