import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { StoresContext } from '~/core/stores';
import { CommonForm } from './CommonForm';

export const FileForm = observer(() => {
  const { formStore } = useContext(StoresContext);
  useEffect(() => {
    formStore.setActionType('add');
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
            value={formStore.actionAppliedFile}
            setStoreValue={v => {
              formStore.setActionAppliedFile(v);
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
            value={formStore.actionData}
            setStoreValue={v => {
              formStore.setActionData(v);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
});
