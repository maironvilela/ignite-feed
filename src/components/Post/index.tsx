import { Profile } from '@components/Profile';
import styles from './styles.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PostComment } from '@components/PostComment';

type Comments = {
  id: string;
  avatarUrl: string;
  comment: string;
  author: string;
  publishedAt: Date;
};

export type Content = {
  type: 'paragraph' | 'link';
  content: string;
};

type PostProps = {
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
  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
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
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <main>
        <section className={styles.content}>
          {contents.map((content) => {
            if (content.type == 'paragraph') {
              return <p>{content.content}</p>;
            }

            if (content.type == 'link') {
              return <a href="#"> {content.content}</a>;
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

      <section>
        {comments.map((comment) => {
          return (
            <PostComment
              key={comment.id}
              publishedAt={comment.publishedAt}
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
