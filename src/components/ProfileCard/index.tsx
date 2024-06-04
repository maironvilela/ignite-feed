import { Profile } from '@components/Profile';
import styles from './styles.module.css';
import { PencilSimpleLine } from '@phosphor-icons/react';

type ProfileProps = {
  name: string;
  profession: string;
  avatarUrl: string;
};

export function ProfileCard({ name, profession, avatarUrl }: ProfileProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}></header>
      <section className={styles.avatar}>
        <Profile avatarUrl={avatarUrl} name={name} profession={profession} />
      </section>
      <button className={styles.btn_profile_edit}>
        <PencilSimpleLine />
        Editar Perfil
      </button>
    </div>
  );
}
