import React from 'react';
import { Briefcase, Users, Award } from 'lucide-react';

interface StatsSectionProps {
  isDarkMode: boolean;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<any>;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ isDarkMode }) => {
  const stats: Stat[] = [
    { label: 'Projects', value: '19+', icon: Briefcase },
    { label: 'Clients', value: '9+', icon: Users },
    { label: 'Yrs Expertise', value: '4+', icon: Award }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`p-5 rounded-xl transition-all duration-300 ${
              isDarkMode
                ? 'bg-slate-900/80 hover:bg-slate-800/80'
                : 'bg-slate-100/80 hover:bg-slate-200/80'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-primary-500/20' : 'bg-primary-500/10'
              }`}>
                <Icon className={`w-5 h-5 ${
                  isDarkMode ? 'text-primary-400' : 'text-primary-600'
                }`} />
              </div>
              <div className={`text-3xl font-bold ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                {stat.value}
              </div>
            </div>
            <div className={`text-sm font-medium ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};