import { Header } from '@components/Header';
import { Post, PostProps } from '@components/Post';
import { ProfileCard } from '@components/ProfileCard';
import styles from './app.module.css';
import { useEffect, useState } from 'react';
import { api } from './services/api';

type Post = PostProps;

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const user = {
    avatarUrl:
      'https://robohash.org/fa702cd215a504d5069edbc7f623979f?set=set4&bgset=&size=400x400',
    name: 'Maria da Silva',
    role: 'Departamento Pessoal'
  };

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
        <ProfileCard
          name={user.name}
          avatarUrl={user.avatarUrl}
          profession={user.role}
        />

        <div className={styles.post}>
          {posts.length === 0 ? (
            //TODO: Adicionar um loader
            <h1>Carregando...</h1>
          ) : (
            posts.map((post) => {
              return (
                <Post
                  key={post.id}
                  publishedAt={new Date(post.publishedAt)}
                  name={post.role}
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
    </div>
  );
}

export default App;
