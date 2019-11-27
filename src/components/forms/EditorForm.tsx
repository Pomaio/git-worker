import { Box, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import MonacoEditor, { MonacoEditorProps } from 'react-monaco-editor';
import { useDebounce } from 'react-use';
import { StoresContext } from '~/core/stores';
import { CommonForm } from './CommonForm';

interface EditorProps extends MonacoEditorProps {
  formating?: boolean;
  value?: string;
}
export const EditorField = ({ value, ...editorProp }: EditorProps) => {
  const { logicStore } = useContext(StoresContext);
  const [data, setData] = useState('');
  useDebounce(() => logicStore.setActionData(data), 1000, [data]);
  useEffect(() => logicStore.setActionType('code'), []);

  return (
    <>
      <Box
        border={'2px solid #dedede'}
        borderRadius={'5px'}
        paddingTop={'15px'}
      >
        <MonacoEditor
          language="javascript"
          height="400px"
          options={{
            formatOnType: true,
            minimap: { enabled: false },
            automaticLayout: true,
            renderLineHighlight: 'none',
            value
          }}
          onChange={v => setData(v)}
          editorDidMount={editor => {
            const model = editor.getModel();
            if (!model) {
              throw new Error('editor model is undefined');
            }
            model.updateOptions({
              tabSize: 2
            });

            setTimeout(() => {
              editor.getAction('editor.action.formatDocument').run();
            }, 1000);
          }}
          {...editorProp}
        />
      </Box>

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
