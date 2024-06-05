import { Avatar } from '@components/Avatar';
import styles from './styles.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ThumbsUp, Trash } from 'phosphor-react';

type PostComment = {
  avatarUrl: string;
  publishedAt: Date;
  author: string;
  comment: string;
};
export function PostComment({
  avatarUrl,
  publishedAt,
  author,
  comment
}: PostComment) {
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  });

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR
    }
  );

  return (
    <div className={styles.container}>
      <header>
        <Avatar avatarUrl={avatarUrl} isBorder={false} />
        <div className={styles.comment}>
          <div className={styles.author_information}>
            <strong>{author}</strong>
            <time
              dateTime={publishedAt.toISOString()}
              title={publishedDateFormatted}
            >
              {publishedDateRelativeToNow}
            </time>
            <button>
              <Trash />
            </button>
          </div>
          <p>{comment}</p>
        </div>
      </header>

      <footer>
        <button>
          <ThumbsUp />
          Aplaudir
          <span>03</span>
        </button>
      </footer>
    </div>
  );
}
