import { Box } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import MonacoEditor, { MonacoEditorProps } from 'react-monaco-editor';
import { useDebounce } from 'react-use';
import { StoresContext } from '~/core/stores';

interface EditorProps extends MonacoEditorProps {
  formating?: boolean;
  value?: string;
}
export const EditorField = ({ value, ...editorProp }: EditorProps) => {
  const { gitStore } = useContext(StoresContext);
  const initialValue =
    value || 'async ({ fsp, vol, repo }) => console.log(vol.toJSON())';

  const [data, setData] = useState(initialValue);

  useDebounce(() => gitStore.setActionData(data), 1000, [data]);
  useEffect(() => {
    gitStore.setActionType('code');
    gitStore.setActionData(initialValue);
  }, []);

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
            value: initialValue
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
          }}
          {...editorProp}
        />
      </Box>
    </>
  );
};
