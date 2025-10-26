import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { tokens } from '../../styles/tokens.css';
import { textStyle } from '../../styles/typography.css';
import { Badge } from '../Badge/Badge';
import * as styles from './UserCard.css';

type Gender = 'male' | 'female' | 'other';
type GradeValue = '초심' | 'D' | 'C' | 'B' | 'A' | '-';
type Grade = {
  local: GradeValue | null;
  national: GradeValue | null;
};

type UserCardProps = {
  variant?: 'public' | 'personal';
  name: string;
  gender: Gender | null;
  grade?: Grade | null;
  email: string;
  role?: 'amateur' | 'pro';
  onClick?: () => void;
};

export default function UserCard({
  variant = 'public',
  name = '정보 없음',
  email = '',
  gender = 'male',
  grade = { local: null, national: '-' },
  role = 'amateur',
  onClick,
}: UserCardProps) {
  return (
    <section className={styles.userCard({ variant })}>
      <div>
        <div
          style={{
            ...textStyle.subtitle.bold,
            marginBottom: 12,
          }}
        >
          {name}
        </div>
        <div>
          {variant === 'public' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: 8,
              }}
            >
              <Badge
                text={gender === 'male' ? '남자' : '여자'}
                variant="outline"
                color="white"
              />
              <Badge
                text={role === 'amateur' ? '아마추어' : '프로'}
                variant="outline"
                color="white"
              />
            </div>
          )}
          {variant === 'personal' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: 10,
              }}
            >
              <span style={{ ...textStyle.heading.medium }}>{email}</span>
              <button
                onClick={onClick}
                className={styles.logOut}
                aria-label="로그아웃"
              >
                <ArrowRightStartOnRectangleIcon
                  width={24}
                  color={tokens.color.text.inverse}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.userCardGrades}>
        {grade?.local && (
          <div>
            <span style={{ ...textStyle.body.semibold }}>지역</span>
            <div>
              <span className={styles.grade({ variant })}>{grade.local}</span>
            </div>
          </div>
        )}
        <div>
          <span style={{ ...textStyle.body.semibold }}>전국</span>
          <div>
            <span className={styles.grade({ variant })}>{grade?.national}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
