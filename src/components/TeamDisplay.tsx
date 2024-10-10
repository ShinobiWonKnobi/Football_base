import React from 'react';
import { Team } from '../types';
import PlayerCard from './PlayerCard';

interface TeamDisplayProps {
  team: Team;
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({ team }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">{team.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {team.players.map((player) => (
          <div key={player.id} className="flex justify-center">
            <PlayerCard player={player} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDisplay;