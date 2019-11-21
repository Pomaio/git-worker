import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CommonForm } from './CommonForm';

const CustomGrid = styled(Grid)`
  .form__flags {
    margin-top: 6px;
  }
`;

export const RegularForm = () => {
  const [regExp, setRegExp] = useState('');
  const [flags, setFlags] = useState([]);
  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  return (
    <CustomGrid container spacing={2} alignItems="center" justify="flex-start">
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
        <FormControl fullWidth variant="outlined" className="form__flags">
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
    </CustomGrid>
  );
};
