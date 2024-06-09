import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import styles from './styles.module.css';
interface JoditEditorComponentProps {
  placeholder?: string;
  content: string;
  setContent: (content: string) => void;
}

export const JoditEditorComponent = ({
  placeholder,
  content,
  setContent
}: JoditEditorComponentProps) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      height: 500,
      width: 300,
      theme: 'dark',
      allowResizeX: false,
      allowResizeY: false,
      toolbar: true,

      placeholder: placeholder || 'Start typings...'
    }),
    [placeholder]
  );

  return (
    <div className={styles.container}>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      />
    </div>
  );
};
