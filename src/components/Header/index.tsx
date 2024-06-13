import { useEffect, useState } from 'react';
import styles from './styles.module.css';
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    // Todo: Fixar o header no topo e deixa-lo transparente ao rolar a barra de rolagem
    <header className={` ${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <img src="./logo.svg" />
      <h1>Ignite Feed</h1>
    </header>
  );
}
