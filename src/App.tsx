import { Header } from '@components/Header';
import { Post, PostProps } from '@components/Post';
import { ProfileCard } from '@components/ProfileCard';
import styles from './app.module.css';
import pageNotFound from './assets/posts-not-found.svg';
import errorServer from './assets/error-server.jpg';

import { usePostQuery } from '@hooks/posts/use-post-query';
import { LoadingPosts } from '@components/LoaderPosts';
import { useContext, useState } from 'react';
import { UserContext } from '@contexts/user-context';
import { Dialog } from '@components/Dialog';
import { NewPost } from '@components/NewPost';

type Post = PostProps;

function App() {
  const { data, isLoading, isError } = usePostQuery();
  const [isOpenModalCreatePost, setIsOpenModalCreatePost] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div>
            <ProfileCard
              name={user.name}
              avatarUrl={user.avatarUrl}
              profession={user.role}
            />

            <button
              className={styles.new_post}
              onClick={() => {
                setIsOpenModalCreatePost(true);
              }}
            >
              Novo Post
            </button>
          </div>

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
                    id={post.id}
                    publishedAt={new Date(post.publishedAt)}
                    author={post.author}
                    role={post.role}
                    avatarUrl={post.avatarUrl}
                    content={post.content}
                    isOpenModalCreatePost={isOpenModalCreatePost}
                    setIsOpenModalCreatePost={setIsOpenModalCreatePost}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <Dialog isOpen={isOpenModalCreatePost}>
        <div className="editor">
          <NewPost setIsOpenModalCreatePost={setIsOpenModalCreatePost} />
        </div>
      </Dialog>
    </div>
  );
}

export default App;
