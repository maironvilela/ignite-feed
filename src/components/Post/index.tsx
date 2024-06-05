import { Profile } from '@components/Profile';
import styles from './styles.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { faker } from '@faker-js/faker';

type PostProps = {
  publishedAt: Date;
  name: string;
  role: string;
  avatarUrl: string;
};

export function Post({ name, role, avatarUrl, publishedAt }: PostProps) {
  const contents = [
    { type: 'paragraph', content: faker.lorem.paragraph({ min: 2, max: 6 }) },
    { type: 'paragraph', content: faker.lorem.paragraph({ min: 4, max: 11 }) },
    { type: 'link', content: faker.internet.email() },
    { type: 'link', content: faker.internet.domainName() }
  ];
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
          <button>Publicar</button>
        </form>

        <section className={styles.comments}></section>
      </main>
    </div>
  );
}
