import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const JoditEditorComponent = ({ placeholder }: any) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(
    () => ({
      readonly: false,
      height: 400,
      placeholder: placeholder || 'Start typings...'
    }),
    [placeholder]
  );

  return (
    <>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {
          console.log(newContent);
        }}
      />

      {content}
    </>
  );
};
