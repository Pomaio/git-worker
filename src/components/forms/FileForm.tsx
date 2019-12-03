import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { StoresContext } from '~/core/stores';
import { CommonForm } from './CommonForm';

export const FileForm = observer(() => {
  const { gitStore } = useContext(StoresContext);
  useEffect(() => {
    gitStore.setActionType('add');
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
            value={gitStore.actionAppliedFile}
            setStoreValue={v => {
              gitStore.setActionAppliedFile(v);
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
            value={gitStore.actionData}
            setStoreValue={v => {
              gitStore.setActionData(v);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
});
