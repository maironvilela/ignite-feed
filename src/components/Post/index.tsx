import { Profile } from '@components/Profile';
import styles from './styles.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PostComment } from '@components/PostComment';
import { getDateUtcFormat } from '@utils/date-utc-format';

export type Comments = {
  id: string;
  avatarUrl: string;
  comment: string;
  author: string;
  publishedAt: Date;
};

export type Content = {
  id: string;
  type: 'paragraph' | 'link';
  content: string;
};

export type PostProps = {
  publishedAt: Date;
  name: string;
  role: string;
  avatarUrl: string;
  contents: Content[];
  comments: Comments[];
};

export function Post({
  name,
  role,
  avatarUrl,
  publishedAt,
  contents,
  comments
}: PostProps) {
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
          {!contents ? (
            <h1>Nenhum Post Encontrado</h1>
          ) : (
            contents.map((c) => {
              if (c.type == 'paragraph') {
                return <p key={c.id}>{c.content}</p>;
              }

              if (c.type == 'link') {
                return (
                  <a key={c.id} href="#">
                    {' '}
                    {c.content}
                  </a>
                );
              }
            })
          )}
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
      </section>
    </div>
  );
}
