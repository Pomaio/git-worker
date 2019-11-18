import React, { useState } from 'react';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Icon,
  Typography
} from '@material-ui/core';
import { CommonForm } from '~/components/CommonForm';
import { RegularForm } from '~/components/RegularForm';
import { EditorField } from '~/components/EditorForm';

export const ActionField = () => {
  const [value, setValue] = useState('regxp');
  return (
    <Box>
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
        <BottomNavigationAction
          label="Регулярка"
          value="regxp"
          icon={<Icon>clear_all</Icon>}
        />
        <BottomNavigationAction
          label="Скрипт"
          value="script"
          icon={<Icon>format_indent_increase</Icon>}
        />
        <BottomNavigationAction
          label="Тестовое действие"
          value="test"
          icon={<Icon>restore</Icon>}
        />
      </BottomNavigation>
      {value === 'regxp' && <RegularForm />}
      {value === 'script' && (
        <Box
          border={'2px solid #dedede'}
          borderRadius={'5px'}
          paddingTop={'15px'}
        >
          <EditorField
            value={'//Начните писать свой код....'}
            onChange={v => {
              //console.log(v);
            }}
            formating={true}
          />
        </Box>
      )}
      {value === 'test' && (
        <CommonForm
          fullWidth
          label="В корень проекта будет добавлен файл test.txt"
          margin="normal"
          disabled
          variant="outlined"
        />
      )}
    </Box>
  );
};
