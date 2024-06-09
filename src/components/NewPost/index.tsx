import { JoditEditorComponent } from '@components/Editor';
import { usePostMutation } from '@hooks/use-post-mutation';
import { useState } from 'react';
import styles from './styles.module.css';

export function NewPost() {
  const { mutate } = usePostMutation();
  const [content, setContent] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);

  const savePost = () => {
    mutate({
      author: 'Mairon Vilela',
      content,
      avatarUrl:
        'https://robohash.org/592538b2ea1113619bd88d3f2523429a?set=set4&bgset=&size=400x400',
      publishedAt: new Date(),
      role: 'RH',
      id: '123'
    });
    setIsOpen(false);
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
        <button onClick={() => savePost()}>Salvar</button>
        <button onClick={() => setIsOpen(false)}>Cancelar</button>
        <button
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
