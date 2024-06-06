import styles from './styles.module.css';

type DialogProps = {
  isOpen?: boolean;
  setOpenModal(isOpen: boolean): void;
};

export default function Dialog({ isOpen, setOpenModal }: DialogProps) {
  return isOpen ? (
    <div className={styles.container}>
      <form className={styles.content}>
        <strong>Excluir Comentário?</strong>
        <span>Você tem certeza que gostaria de excluir este comentário?</span>
        <div className={styles.actions}>
          <button onClick={() => setOpenModal(!isOpen)}>Cancelar</button>
          <button>Sim, excluir</button>
        </div>
      </form>
    </div>
  ) : (
    ''
  );
}
