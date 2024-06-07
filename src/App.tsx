import { Header } from '@components/Header';
import { Post } from '@components/Post';
import { ProfileCard } from '@components/ProfileCard';
import { faker } from '@faker-js/faker';
import styles from './app.module.css';
import { useEffect, useState } from 'react';
import { api } from './services/api';

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

type Post = {
  id: string;
  publishedAt: Date;
  name: string;
  role: string;
  avatarUrl: string;
  contents: Content[];
  comments: Comments[];
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const avatarUrl = faker.image.avatar();
  const name = faker.name.fullName();
  const role = faker.commerce.department();

  const fetchData = async () => {
    const response = await api.get('http://localhost:3000/posts', {
      headers: {
        Accept: 'application/json'
      }
    });
    const posts = response.data;
    setPosts(posts);
    console.log(posts[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.profileCard}>
        <ProfileCard name={name} avatarUrl={avatarUrl} profession={role} />

        {posts.length === 0 ? (
          <h1>Carregando</h1>
        ) : (
          posts.map((post) => {
            return (
              <Post
                key={post.id}
                publishedAt={new Date(post.publishedAt)}
                name={role}
                role={post.role}
                avatarUrl={avatarUrl}
                contents={post.contents}
                comments={post.comments}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
