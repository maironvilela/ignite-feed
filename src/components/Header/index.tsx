import styles from './styles.module.css';
export function Header() {
  return (
    <header className={styles.header}>
      <img src="./logo.svg" />
      <h1>Ignite Feed</h1>
    </header>
  );
}
