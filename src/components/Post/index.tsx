import { Profile } from '@components/Profile';
import styles from './styles.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getDateUtcFormat } from '@utils/date-utc-format';
import { LoadingPosts } from '@components/LoaderPosts';
import { usePostCommentQuery } from '@hooks/comments/use-comment-query';
import { PostComment } from '@components/PostComment';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { usePostCommentMutation } from '@hooks/comments/use-comment-save-mutation';

import { UserContext } from '@contexts/user-context';

export type PostProps = {
  id: string;
  publishedAt: Date;
  author: string;
  role: string;
  avatarUrl: string;
  content: string;
  isOpenModalCreatePost: boolean;
  setIsOpenModalCreatePost(isOpenModalCreatePost: boolean): void;
};

export function Post({
  id,
  author,
  role,
  avatarUrl,
  publishedAt,
  content
}: PostProps) {
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState('');
  const { data: comments, isLoading: isLoadingComment } =
    usePostCommentQuery(id);
  const { mutate } = usePostCommentMutation();
  const [hiddenFooter, setHiddenFooter] = useState(false);

  const dataHoraUtc = getDateUtcFormat(publishedAt);

  const publishedDateFormatted = format(
    dataHoraUtc,
    "dd 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(dataHoraUtc, {
    locale: ptBR,
    addSuffix: true
  });

  const handleCreateNewComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewComment('');
    mutate({
      author: user.name,
      avatarUrl: user.avatarUrl,
      comment: newComment,
      publishedAt: new Date(),
      post_id: id
    });

    setHiddenFooter(false);
  };

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewComment(event.target.value);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Profile
          avatarUrl={avatarUrl}
          name={author}
          profession={role}
          isVerticalView={false}
        />

        <time
          title={publishedDateFormatted}
          dateTime={new Date(publishedAt).toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <main>
        <section className={styles.content}>
          <div
            className="render-html"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
        <form onSubmit={handleCreateNewComment}>
          <strong>Deixe seu feedback</strong>
          <textarea
            name="comment"
            placeholder="Deixe um comentário"
            required
            value={newComment}
            onChange={handleNewCommentChange}
            onFocus={() => setHiddenFooter(true)}
          />
          <footer className={hiddenFooter ? styles.hiddenFooter : ''}>
            <button type="submit">Publicar</button>
          </footer>
        </form>
      </main>

      <section>
        {isLoadingComment && <LoadingPosts />}
        {comments?.map((comment) => {
          return (
            <PostComment
              key={comment.id}
              id={comment.id}
              publishedAt={new Date(comment.publishedAt)}
              author={comment.author}
              avatarUrl={comment.avatarUrl}
              comment={comment.comment}
            />
          );
        })}
      </section>
    </div>
  );
}
