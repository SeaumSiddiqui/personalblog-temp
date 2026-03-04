import { useEffect, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { useTheme } from '../../hooks/useTheme';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export default function GitHubHeatmap() {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);

  const GITHUB_USERNAME = 'YOUR_GITHUB_USERNAME';

  useEffect(() => {
    fetchGitHubContributions();
  }, []);

  const fetchGitHubContributions = async () => {
    try {
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
      );
      const result = await response.json();

      const contributions = result.contributions.map((day: any) => ({
        date: day.date,
        count: day.count,
        level: day.level as 0 | 1 | 2 | 3 | 4,
      }));

      setData(contributions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub contributions:', error);
      setData(generateMockData());
      setLoading(false);
    }
  };

  const generateMockData = (): ContributionDay[] => {
    const data: ContributionDay[] = [];
    const today = new Date();

    for (let i = 365; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const randomCount = Math.random() > 0.3 ? Math.floor(Math.random() * 15) : 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;

      if (randomCount === 0) level = 0;
      else if (randomCount <= 3) level = 1;
      else if (randomCount <= 6) level = 2;
      else if (randomCount <= 9) level = 3;
      else level = 4;

      data.push({
        date: date.toISOString().split('T')[0],
        count: randomCount,
        level,
      });
    }

    return data;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
          isDarkMode ? 'border-primary-400' : 'border-primary-600'
        }`} />
      </div>
    );
  }

  const explicitTheme = {
    light: [
      'rgba(235, 237, 240, 0.4)',
      'rgba(155, 233, 168, 0.4)',
      'rgba(64, 196, 99, 0.5)',
      'rgba(48, 161, 78, 0.6)',
      'rgba(33, 110, 57, 0.7)'
    ],
    dark: [
      'rgba(40, 40, 40, 0.3)',
      'rgba(155, 233, 168, 0.2)',
      'rgba(64, 196, 99, 0.3)',
      'rgba(48, 161, 78, 0.4)',
      'rgba(33, 110, 57, 0.5)'
    ],
  };

  return (
    <div className="w-full">
      <div className={`text-xs font-mono tracking-wide mb-4 ${
        isDarkMode ? 'text-slate-400' : 'text-slate-600'
      }`}>
        — COMMITS
      </div>

      <div className="overflow-x-auto -mx-1">
        <div style={{ minWidth: '700px' }}>
          <ActivityCalendar
            data={data}
            theme={explicitTheme}
            colorScheme={isDarkMode ? 'dark' : 'light'}
            blockSize={9}
            blockMargin={2.5}
            blockRadius={2}
            fontSize={9}
            hideColorLegend={true}
            hideMonthLabels={false}
            hideTotalCount={true}
            showWeekdayLabels={true}
            labels={{
              months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              weekdays: ['Mon', 'Wed', 'Fri'],
              totalCount: '{{count}} contributions in {{year}}',
            }}
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '9px',
              color: isDarkMode ? 'rgba(148, 163, 184, 0.6)' : 'rgba(71, 85, 105, 0.6)',
            }}
          />
        </div>
      </div>

      <div className={`text-xs font-mono mt-4 text-center ${
        isDarkMode ? 'text-slate-500' : 'text-slate-500'
      }`}>
        COMMITS BY DAY
      </div>
    </div>
  );
}
