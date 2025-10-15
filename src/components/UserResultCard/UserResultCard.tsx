import { Badge } from '@/components/Badge/Badge';
import * as styles from '@/components/UserResultCard/UserResultCard.css';

export function UserResultCard() {
  return (
    <div className={styles.userResultCard}>
      <div>김길규</div>
      <Badge text="지역C 전국D" variant="filled" color="primary" />
      <Badge text="남자" variant="outline" color="primary" />
    </div>
  );
}
