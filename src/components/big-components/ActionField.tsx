import React, { useState, useContext } from 'react';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Grid,
  Icon,
  Typography
} from '@material-ui/core';

import { CommonForm } from '~/components/CommonForm';
import { EditorField } from '~/components/EditorForm';
import { RegularForm } from '~/components/RegularForm';
import { StoresContext } from '~/core/stores';

export const ActionField = () => {
  const [value, setValue] = useState('regxp');
  const { logicStore } = useContext(StoresContext);
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
            formating={false}
          />
        </Box>
      )}
      {value === 'test' && (
        <CommonForm
          fullWidth
          label="Содержание файла"
          placeholder="Простота — залог надежности."
          margin="normal"
          variant="outlined"
          helperText="В корень проекта будет добавлен файл devopsTest.txt"
        />
      )}
      <Grid
        container
        spacing={1}
        alignItems="flex-end"
        justify="flex-end"
        className="submit__button"
      >
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() =>
            logicStore.setActionInfo({ type: 'test', data: 'devopsTest' })
          }
        >
          Save
        </Button>
      </Grid>
    </Box>
  );
};
