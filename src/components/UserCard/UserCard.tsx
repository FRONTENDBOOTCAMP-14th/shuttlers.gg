import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { tokens } from '../../styles/tokens.css';
import { Badge } from '../Badge/Badge';
import * as styles from './UserCard.css';

type UserCardProps = {
  variant?: 'public' | 'personal';
  name: string;
  gender: 'male' | 'female';
  grade?: { local?: string; national: string };
  email: string;
  role?: 'amateur' | 'pro';
  onClick?: () => void;
};

export default function UserCard({
  variant = 'public',
  name = '정보 없음',
  email = '',
  gender = 'male',
  grade = { local: undefined, national: '-' },
  role = 'amateur',
  onClick,
}: UserCardProps) {
  return (
    <article className={styles.userCard({ variant })}>
      <div>
        <strong>{name}</strong>
        <div className={styles.userCardDetail({ variant })}>
          {variant === 'public' && (
            // TODO: Badge 컴포넌트 수정사항 반영 후 수정
            <>
              <Badge text={gender === 'male' ? '남자' : '여자'} />
              <Badge text={role === 'amateur' ? '아마추어' : '프로'} />
            </>
          )}
          {variant === 'personal' && (
            <>
              <span>{email}</span>
              <button onClick={onClick}>
                <ArrowRightStartOnRectangleIcon
                  width={28}
                  color={tokens.color.text.inverse}
                />
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles.userCardGrades}>
        {grade.local && (
          <div className={styles.flexCol}>
            <span>지역</span>
            <div className={styles.userCardGrade({ variant })}>
              {grade.local}
            </div>
          </div>
        )}
        <div className={styles.flexCol}>
          <span>전국</span>
          <div className={styles.userCardGrade({ variant })}>
            {grade.national}
          </div>
        </div>
      </div>
    </article>
  );
}
