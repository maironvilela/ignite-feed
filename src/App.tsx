import { Header } from '@components/Header';
import { Content, Post } from '@components/Post';
import { ProfileCard } from '@components/ProfileCard';
import { faker } from '@faker-js/faker';
import styles from './app.module.css';
import { useEffect } from 'react';

function App() {
  const contents: Content[] = [
    { type: 'paragraph', content: faker.lorem.paragraph({ min: 2, max: 6 }) },
    { type: 'paragraph', content: faker.lorem.paragraph({ min: 2, max: 6 }) },

    {
      type: 'paragraph',
      content: faker.lorem.paragraph({ min: 4, max: 11 })
    },
    { type: 'link', content: faker.internet.email() },
    { type: 'link', content: faker.internet.domainName() }
  ];
  const avatarUrl = faker.image.avatar();
  const name = faker.name.fullName();
  const role = faker.commerce.department();
  const comments = [
    {
      id: faker.datatype.uuid(),
      avatarUrl: faker.image.avatarGitHub(),
      comment: faker.lorem.paragraph({ min: 2, max: 6 }),
      author: faker.name.fullName(),
      publishedAt: faker.date.recent()
    },
    {
      id: faker.datatype.uuid(),
      avatarUrl: faker.image.avatarGitHub(),
      comment: faker.lorem.paragraph({ min: 2, max: 6 }),
      author: faker.name.fullName(),
      publishedAt: faker.date.recent()
    }
  ];

  const fetchData = () => {
    console.log('Carregando informações');
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.profileCard}>
        <ProfileCard name={name} avatarUrl={avatarUrl} profession={role} />
        <Post
          name={name}
          avatarUrl={avatarUrl}
          role={role}
          contents={contents}
          publishedAt={faker.date.recent()}
          comments={comments}
        />
      </div>
    </div>
  );
}

export default App;
