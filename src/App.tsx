import React, { useState } from 'react';
import { Player, Team } from './types';
import PlayerForm from './components/PlayerForm';
import PlayerCard from './components/PlayerCard';
import TeamDisplay from './components/TeamDisplay';
import { generateTeams } from './utils/teamGenerator';
import { Users, Shuffle } from 'lucide-react';

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<[Team, Team] | null>(null);

  const handleAddPlayer = (player: Player) => {
    setPlayers([...players, player]);
  };

  const handleGenerateTeams = () => {
    if (players.length < 2) {
      alert('You need at least 2 players to generate teams.');
      return;
    }
    setTeams(generateTeams(players));
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-[#4a3d0b] to-[#1a1602] p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#e1c072]">Football Team Generator</h1>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#e1c072]">Add Player</h2>
            <PlayerForm onAddPlayer={handleAddPlayer} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#e1c072]">Player List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
              {players.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            className="bg-[#e1c072] hover:bg-[#c9a84d] text-[#1a1602] font-bold py-2 px-4 rounded mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={handleGenerateTeams}
          >
            <Users className="inline-block mr-2" />
            {teams ? 'Regenerate Teams' : 'Generate Teams'}
          </button>
          {teams && (
            <button
              className="bg-[#fdeaa7] hover:bg-[#e5d28e] text-[#1a1602] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              onClick={handleGenerateTeams}
            >
              <Shuffle className="inline-block mr-2" />
              Shuffle Teams
            </button>
          )}
        </div>
        {teams && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TeamDisplay team={teams[0]} />
            <TeamDisplay team={teams[1]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;