import styles from './styles.module.css';
import { faker } from '@faker-js/faker';
import { PencilSimpleLine } from '@phosphor-icons/react';

type ProfileProps = {
  name: string;
  profession: string;
  avatarUrl: string;
};
export function Profile({ name, profession, avatarUrl }: ProfileProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}></header>
      <img className={styles.avatar} src={avatarUrl} />

      <section className={styles.profile_information}>
        <strong>{name}</strong>
        <span>UI {profession}</span>
      </section>

      <button className={styles.btn_profile_edit}>
        <PencilSimpleLine />
        Editar Perfil
      </button>
    </div>
  );
}
