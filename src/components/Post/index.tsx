import { Profile } from '@components/Profile';
import styles from './styles.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getDateUtcFormat } from '@utils/date-utc-format';
import { LoadingPosts } from '@components/LoaderPosts';
import { usePostCommentQuery } from '@hooks/use-post-comment-query';
import { PostComment } from '@components/PostComment';

export type PostProps = {
  id: string;
  publishedAt: Date;
  author: string;
  role: string;
  avatarUrl: string;
  content: string;
};

export function Post({
  id,
  author,
  role,
  avatarUrl,
  publishedAt,
  content
}: PostProps) {
  //const { data: contents, isLoading: isLoadingContent } =
  //usePostContentQuery(id);
  const { data: comments, isLoading: isLoadingComment } =
    usePostCommentQuery(id);

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
        <form>
          <strong>Deixe seu feedback</strong>
          <textarea placeholder="Escreva um comentário" />
          <footer>
            <button>Publicar</button>
          </footer>
        </form>
      </main>

      <section>
        {isLoadingComment && <LoadingPosts />}
        {comments?.map((comment) => {
          return (
            <PostComment
              key={comment.id}
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
