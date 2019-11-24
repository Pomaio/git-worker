import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StoresContext } from '~/core/stores';
import { CommonForm } from './CommonForm';

export const RegularForm = () => {
  const [regExp, setRegExp] = useState('');
  const [flags, setFlags] = useState([]);

  const { logicStore } = useContext(StoresContext);

  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
    logicStore.setActionType('regexp');
  }, []);

  useEffect(() => {
    const r = new RegExp(regExp, flags.join(''));
    logicStore.setActionData(r);
  }, [regExp, flags]);

  console.log('render RegularForm', logicStore.actionData);

  return (
    <>
      <Grid container spacing={2} alignItems="center" justify="flex-start">
        <Grid item xs={9}>
          <CommonForm
            fullWidth
            label="Регулярное выражение"
            placeholder="(\w+)\s(\w+)"
            multiline
            margin="normal"
            variant="outlined"
            setStoreValue={v => setRegExp(v)}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth variant="outlined" style={{ marginTop: 6 }}>
            <InputLabel ref={inputLabel}>Флаги</InputLabel>
            <Select
              value={flags}
              onChange={e => setFlags(e.target.value as any)}
              multiple
              labelWidth={labelWidth}
            >
              <MenuItem value="g">g</MenuItem>
              <MenuItem value="i">i</MenuItem>
              <MenuItem value="m">m</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justify="flex-start">
        <Grid item xs={12}>
          <CommonForm
            fullWidth
            label="Выбор файлов"
            placeholder="'src/**/*.{css,scss}', '**/index.js'"
            multiline
            margin="normal"
            variant="outlined"
            setStoreValue={v => logicStore.setActionAppliedFile(v)}
          />
        </Grid>
      </Grid>
    </>
  );
};
