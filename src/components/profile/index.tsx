import styles from './styles.module.css';
import { faker } from '@faker-js/faker';
import { PencilSimpleLine } from '@phosphor-icons/react';
export function Profile() {
  return (
    <div className={styles.container}>
      <header className={styles.header}></header>
      <img className={styles.avatar} src={faker.image.avatar()} />

      <section className={styles.profile_information}>
        <strong>Leslie Alexander</strong>
        <span>UI Designer</span>
      </section>

      <button className={styles.btn_profile_edit}>
        <PencilSimpleLine />
        Editar Perfil
      </button>
    </div>
  );
}
