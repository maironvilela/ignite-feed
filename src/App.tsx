import { Header } from '@components/Header';
import { Content, Post } from '@components/Post';
import { faker } from '@faker-js/faker';

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
  return (
    <>
      <Header />;
      <Post
        name={name}
        role={role}
        avatarUrl={avatarUrl}
        contents={contents}
        publishedAt={new Date()}
      />
    </>
  );
}

export default App;
