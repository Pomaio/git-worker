import React, { useContext, useState } from 'react';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Grid,
  Icon,
  Typography
} from '@material-ui/core';

import { CommonForm } from '~/components/forms/CommonForm';
import { EditorField } from '~/components/forms/EditorForm';
import { RegularForm } from '~/components/forms/RegularForm';
import { StoresContext } from '~/core/stores';

export const ActionField = () => {
  const [tab, setTab] = useState('regexp');
  const { logicStore } = useContext(StoresContext);

  console.log('render ActionField');

  return (
    <Box>
      <Typography variant="h5" component="h5">
        Варианты изменения
      </Typography>
      <BottomNavigation
        value={tab}
        onChange={(event, newValue) => {
          setTab(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Регулярка"
          value="regexp"
          icon={<Icon>clear_all</Icon>}
        />
        <BottomNavigationAction
          label="Скрипт"
          value="code"
          icon={<Icon>format_indent_increase</Icon>}
        />
        <BottomNavigationAction
          label="Тестовое действие"
          value="test"
          icon={<Icon>restore</Icon>}
        />
      </BottomNavigation>
      {tab === 'regexp' && <RegularForm />}
      {tab === 'code' && <EditorField />}
      {tab === 'test' && (
        <CommonForm
          fullWidth
          label="Содержание файла"
          placeholder="Простота — залог надежности."
          margin="normal"
          variant="outlined"
          helperText="В корень проекта будет добавлен файл devopsTest.txt"
          setStoreValue={v => {
            logicStore.setActionData(v);
            logicStore.setActionType('test');
          }}
        />
      )}
    </Box>
  );
};
