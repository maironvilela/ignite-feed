import { Header } from '@components/Header';
import { Post, PostProps } from '@components/Post';
import { ProfileCard } from '@components/ProfileCard';
import styles from './app.module.css';
import { useEffect, useState } from 'react';
import { api } from './services/api';

type Post = PostProps;

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const avatarUrl =
    'https://robohash.org/fa702cd215a504d5069edbc7f623979f?set=set4&bgset=&size=400x400';
  const name = 'Maria da Silva';
  const role = 'Departamento Pessoal';

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
                avatarUrl={post.avatarUrl}
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
