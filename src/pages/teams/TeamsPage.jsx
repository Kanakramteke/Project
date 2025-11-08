import React from 'react';

export default function TeamsPage() {
  const teams = [
    {
      id: 1,
      name: 'Team Alpha',
      description: 'A team focused on AI and Machine Learning projects.',
      members: 5,
      image: '/team-alpha.jpg',
    },
    {
      id: 2,
      name: 'Innovators',
      description: 'A group of innovators working on cutting-edge technology.',
      members: 8,
      image: '/innovators.jpg',
    },
    {
      id: 3,
      name: 'Code Warriors',
      description: 'Passionate coders building impactful software solutions.',
      members: 6,
      image: '/code-warriors.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-full px-6 py-5 md:py-6 flex items-center justify-between">
          <div className="relative w-full max-w-lg">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 text-xl">🔍</span>
            <input
              type="text"
              placeholder="Search Teams..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg font-semibold shadow-sm"
            />
          </div>
          <button
            className="px-6 py-3 bg-cyan-500 text-white font-bold rounded-lg shadow-md hover:bg-cyan-600 transition-all"
          >
            Create Team
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
            >
              <img src={team.image} alt={team.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{team.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{team.description}</p>
                <p className="text-sm text-slate-500">Members: {team.members}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}