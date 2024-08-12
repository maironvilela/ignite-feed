import { Avatar } from '@components/Avatar';
import styles from './styles.module.css';

export type ProfileProps = {
  name: string;
  profession: string;
  avatarUrl: string;
  isVerticalView?: boolean;
};

export function Profile({
  name,
  profession,
  avatarUrl,
  isVerticalView = true
}: ProfileProps) {
  return (
    <div
      className={[
        styles.container,
        isVerticalView ? styles.verticalView : styles.horizontalView
      ].join(' ')}
    >
      <Avatar avatarUrl={avatarUrl} isBorder={true} />
      <section
        className={[
          styles.profile_information,
          isVerticalView ? '' : styles.profile_information_horizontal_view
        ].join(' ')}
      >
        <strong>{name}</strong>
        <span>{profession}</span>
      </section>
    </div>
  );
}
