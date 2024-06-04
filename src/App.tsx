import { Header } from '@components/Header';
import { ProfileCard } from '@components/ProfileCard';
import { faker } from '@faker-js/faker';

function App() {
  const avatarUrl = faker.image.avatar();
  const name = faker.name.fullName();
  const profession = faker.commerce.department();
  return (
    <>
      <Header />;
      <ProfileCard avatarUrl={avatarUrl} name={name} profession={profession} />
    </>
  );
}

export default App;
