import styles from './styles.module.css';

type DialogProps = {
  isOpen?: boolean;
  children: React.ReactNode;
};

export function Dialog({ isOpen, children }: DialogProps) {
  return isOpen ? <div className={styles.container}>{children}</div> : '';
}
