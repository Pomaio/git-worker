import React, { useEffect, useState } from 'react';
import MonacoEditor, { MonacoEditorProps } from 'react-monaco-editor';

interface EditorProps extends MonacoEditorProps {
  formating?: boolean;
  value?: string;
}
export const EditorField = ({
  value,
  formating,
  ...editorProp
}: EditorProps) => {
  const [edit, setEdit] = useState();
  const format = (editor: any) => {
    if (editor) editor.getAction('editor.action.formatDocument').run();
  };
  useEffect(() => {
    const timer = setInterval(() => (formating ? format(edit) : {}), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [formating]);

  return (
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
      editorDidMount={editor => {
        setEdit(editor);
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
  );
};
