import React, { useContext, useState } from 'react';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Icon,
  Typography
} from '@material-ui/core';

import { EditorField } from '~/components/forms/EditorForm';
import { RegularForm } from '~/components/forms/RegularForm';
import { StoresContext } from '~/core/stores';
import { FileForm } from '../forms/FileForm';

export const ActionField = () => {
  const [tab, setTab] = useState('add');
  const { logicStore } = useContext(StoresContext);

  return (
    <Box>
      <Typography variant="h5" component="h5">
        Варианты изменения
      </Typography>
      <BottomNavigation
        value={tab}
        onChange={(event, newValue) => {
          setTab(newValue);
          logicStore.resetActionData();
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Добавление файла"
          value="add"
          icon={<Icon>library_add</Icon>}
        />
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
      </BottomNavigation>
      {tab === 'regexp' && <RegularForm />}
      {tab === 'code' && <EditorField />}
      {tab === 'add' && <FileForm />}
    </Box>
  );
};
