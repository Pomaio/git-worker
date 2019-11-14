import React from 'react';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Icon,
  Typography
} from '@material-ui/core';
import styled from 'styled-components';
import { CommonForm } from '~/components/CommonForm';

const StyledBox = styled(Box)`
  margin: 30px 0;
  .MuiBox-root {
    margin: 0;
  }
  .MuiTypography-root {
    padding-bottom: 20px;
  }
`;

export const ActionField = () => {
  const [value, setValue] = React.useState(0);
  return (
    <StyledBox>
      <Typography variant="h5" component="h5">
        Варианты изменения
      </Typography>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction label="Что-то" icon={<Icon>restore</Icon>} />
        <BottomNavigationAction
          label="Регулярка"
          icon={<Icon>clear_all</Icon>}
        />
        <BottomNavigationAction
          label="Скрипт"
          icon={<Icon>format_indent_increase</Icon>}
        />
      </BottomNavigation>
      <CommonForm
        id="outlined-multiline-static"
        label="Скрипт"
        multiline
        fullWidth
        margin="normal"
        variant="outlined"
      />
    </StyledBox>
  );
};
