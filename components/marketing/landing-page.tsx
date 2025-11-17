import React from 'react';

interface Funnel {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface LandingPageProps {
  onSelectFunnel: (funnelId: string) => void;
}

export function LandingPage({ onSelectFunnel }: LandingPageProps) {
  const funnels: Funnel[] = [
    {
      id: 'mediterraneanDiet',
      title: 'Get a Personalized Meal Plan',
      description: 'Tailored meal ideas to kickstart your healthy journey.',
      icon: '🥗',
    },
    {
      id: 'manifestationJournal',
      title: 'Create Your Self-Actualization Plan',
      description: 'A guided session to help you define and achieve your true potential.',
      icon: '✨',
    },
    {
      id: 'fidelityGuide',
      title: 'Tarot Reading for Relationships',
      description: 'Find guidance and clarity on your relationship dynamics.',
      icon: '🔮',
    },
  ];

  return (
    <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 transform transition-all duration-300 ease-in-out">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6 tracking-tight leading-tight">
        Welcome to the AI Funnel
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-10 text-lg">
        Choose an adventure to begin.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {funnels.map((f) => (
          <div
            key={f.id}
            onClick={() => onSelectFunnel(f.id)}
            className="group bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
              {f.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
