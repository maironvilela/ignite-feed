import { Header } from '@components/Header';
import { Post, PostProps } from '@components/Post';
import { ProfileCard } from '@components/ProfileCard';
import styles from './app.module.css';
import pageNotFound from './assets/posts-not-found.svg'; // Tell webpack this JS file uses this image
import errorServer from './assets/error-server.jpg'; // Tell webpack this JS file uses this image

import { usePostQuery } from '@hooks/use-post-query';
import { LoadingPosts } from '@components/LoaderPosts';

type Post = PostProps;

function App() {
  const { data, isLoading, isError } = usePostQuery();

  const user = {
    avatarUrl:
      'https://robohash.org/fa702cd215a504d5069edbc7f623979f?set=set4&bgset=&size=400x400',
    name: 'Maria da Silva',
    role: 'Departamento Pessoal'
  };

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
          {isLoading && <LoadingPosts />}
          {isError && (
            <div>
              <img src={errorServer} alt="Logo" />
            </div>
          )}
          {data?.length === 0 && (
            <div>
              <img src={pageNotFound} alt="Logo" />
            </div>
          )}

          {!isLoading &&
            data?.map((post) => {
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
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
