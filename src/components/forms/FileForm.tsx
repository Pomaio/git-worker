import { Grid } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { StoresContext } from '~/core/stores';
import { CommonForm } from './CommonForm';

export const FileForm = () => {
  const { logicStore } = useContext(StoresContext);
  useEffect(() => {
    logicStore.setActionType('add');
  });
  return (
    <>
      <Grid container spacing={2} alignItems="center" justify="flex-start">
        <Grid item xs={12}>
          <CommonForm
            fullWidth
            label="Имя файла"
            placeholder="Тут должен быть полный путь к файлу"
            margin="normal"
            variant="outlined"
            setStoreValue={v => {
              logicStore.setActionAppliedFile(v);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CommonForm
            fullWidth
            label="Содержание файла"
            placeholder="Простота — залог надежности."
            margin="normal"
            multiline
            variant="outlined"
            setStoreValue={v => {
              logicStore.setActionData(v);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};
