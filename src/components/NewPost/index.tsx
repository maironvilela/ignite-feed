import { JoditEditorComponent } from '@components/Editor';
import { usePostMutation } from '@hooks/use-post-mutation';
import { useContext, useState } from 'react';
import styles from './styles.module.css';
import { UserContext } from '@contexts/user-context';

interface NewPostProps {
  setIsOpenModalCreatePost(isOpenModalCreatePost: boolean): void;
}

export function NewPost({ setIsOpenModalCreatePost }: NewPostProps) {
  const { user } = useContext(UserContext);
  const { mutate } = usePostMutation();
  const [content, setContent] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const savePost = () => {
    mutate({
      author: user.name,
      content,
      avatarUrl: user.avatarUrl,
      publishedAt: new Date(),
      role: user.role
    });
    setIsOpenModalCreatePost(false);
    setContent('');
  };

  return (
    <>
      <JoditEditorComponent
        placeholder="Digite aqui o conteudo do Post"
        content={content}
        setContent={setContent}
      />
      <div className={styles.actions}>
        <button className={styles.btn_save} onClick={() => savePost()}>
          Salvar
        </button>
        <button
          className={styles.btn_cancel}
          onClick={() => setIsOpenModalCreatePost(false)}
        >
          Cancelar
        </button>
        <button
          className={styles.btn_clean}
          onClick={() => {
            setContent('');
          }}
        >
          Limpar
        </button>
      </div>
    </>
  );
}
