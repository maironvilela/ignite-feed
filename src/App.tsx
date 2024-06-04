import { Header } from '@components/Header';
import { Profile } from '@components/profile';
import { faker } from '@faker-js/faker';

function App() {
  const avatarUrl = faker.image.avatar();
  const name = faker.name.fullName();
  const profession = faker.commerce.department();
  return (
    <>
      <Header />;
      <Profile avatarUrl={avatarUrl} name={name} profession={profession} />
    </>
  );
}

export default App;
