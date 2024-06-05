import styles from './styles.module.css';

type AvatarProps = {
  avatarUrl: string;
  isBorder?: boolean;
};
export function Avatar({ avatarUrl, isBorder = true }: AvatarProps) {
  return (
    <img
      src={avatarUrl}
      className={[styles.avatar, isBorder ? styles.with_border : ''].join(' ')}
    />
  );
}
