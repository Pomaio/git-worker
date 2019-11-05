import React, { useState } from 'react';

import {
  createStyles,
  makeStyles,
  Box,
  Theme,
  Typography
} from '@material-ui/core';
import { CollapseComponent } from './CollapseComponent';
import { FormField } from './form/FormField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    margin: {
      marginTop: theme.spacing(3)
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);
export const AdressComponent = () => {
  const classes = useStyles();

  return (
    <Box m={2}>
      <Typography variant="h5" component="h5">
        Git проекты
      </Typography>
      <FormField />
      <CollapseComponent />
    </Box>
  );
};
