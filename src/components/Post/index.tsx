import { Profile } from '@components/Profile';
import styles from './styles.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getDateUtcFormat } from '@utils/date-utc-format';
import { usePostContentQuery } from '@hooks/use-post-content-query';
import { LoadingPosts } from '@components/LoaderPosts';

export type PostProps = {
  id: string;
  publishedAt: Date;
  name: string;
  role: string;
  avatarUrl: string;
};

export function Post({ id, name, role, avatarUrl, publishedAt }: PostProps) {
  const { data, isLoading } = usePostContentQuery(id);

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
  const isVerticalView = false;
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Profile
          avatarUrl={avatarUrl}
          name={name}
          profession={role}
          isVerticalView={isVerticalView}
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
          {isLoading && <LoadingPosts />}

          {!isLoading && !data && <h1>Nenhum Post Encontrado</h1>}

          {!isLoading &&
            data?.map((content) => {
              if (content.type == 'paragraph') {
                return <p key={content.id}>{content.content}</p>;
              }

              if (content.type == 'link') {
                return (
                  <a key={content.id} href="#">
                    {' '}
                    {content.content}
                  </a>
                );
              }
            })}
        </section>
        <form>
          <strong>Deixe seu feedback</strong>
          <textarea placeholder="Escreva um comentário" />
          <footer>
            <button>Publicar</button>
          </footer>
        </form>
      </main>
      {/* 
      <section>
        {comments.map((comment) => {
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
      </section>*/}
    </div>
  );
}
