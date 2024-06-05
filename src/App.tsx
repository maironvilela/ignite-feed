import { Header } from '@components/Header';
import { Post } from '@components/Post';
import { faker } from '@faker-js/faker';

function App() {
  const avatarUrl = faker.image.avatar();
  const name = faker.name.fullName();
  const role = faker.commerce.department();
  return (
    <>
      <Header />;
      <Post
        name={name}
        role={role}
        avatarUrl={avatarUrl}
        publishedAt={new Date()}
      />
    </>
  );
}

export default App;
