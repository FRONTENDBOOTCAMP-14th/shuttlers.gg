import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import * as styles from './WinRateChart.css';

type WinRateChartProps = {
  wins: number;
  losses: number;
};

export function WinRateChart({ wins, losses }: WinRateChartProps) {
  const winRate =
    losses === 0 ? 100 : Math.round((wins / (wins + losses)) * 100);
  const data = [
    { name: '승', value: wins },
    { name: '패', value: losses },
  ];

  const COLORS = ['#4A90E2', '#E8F4F8'];

  return (
    <figure className={styles.chartContainer}>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  strokeWidth={0}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <figcaption className={styles.chartCenter}>
          <span
            className={styles.winRateValue}
            aria-label={`승률 ${winRate}퍼센트`}
          >
            {winRate}%
          </span>
          <span className={styles.winRateLabel}>
            {wins}승 {losses}패
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
