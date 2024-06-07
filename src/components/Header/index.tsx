import styles from './styles.module.css';
export function Header() {
  return (
    // Todo: Fixar o header no topo e deixa-lo transparente ao rolar a barra de rolagem
    <header className={styles.header}>
      <img src="./logo.svg" />
      <h1>Ignite Feed</h1>
    </header>
  );
}
