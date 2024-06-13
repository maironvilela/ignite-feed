import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import styles from './styles.module.css';
type JoditEditorComponentProps = {
  placeholder?: string;
  content: string;
  setContent: (content: string) => void;
};

export const JoditEditorComponent = ({
  placeholder,
  content,
  setContent
}: JoditEditorComponentProps) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      height: 400,
      width: 600,
      theme: 'dark',
      allowResizeX: false,
      allowResizeY: false,
      toolbar: true,

      placeholder: placeholder
    }),
    [placeholder]
  );

  return (
    <div className={styles.container}>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => setContent(newContent)}
      />
    </div>
  );
};
