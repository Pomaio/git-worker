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
  const { logicStore } = useContext(StoresContext);
  const [data, setData] = useState('');
  const defaultValue =
    value || 'async ( fsp, vol, repo) => console.log(vol.toJSON())';

  useDebounce(() => logicStore.setActionData(data), 1000, [data]);
  useEffect(() => {
    logicStore.setActionType('code');
    logicStore.setActionData(defaultValue);
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
            value: defaultValue
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
    </>
  );
};
