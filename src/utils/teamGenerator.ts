import { Player, Team } from '../types';

const calculatePlayerScore = (player: Player): number => {
  const { PAC, DRI, SHO, DEF, PAS, PHY } = player.stats;
  return PAC + DRI + SHO + DEF + PAS + PHY;
};

export const generateTeams = (players: Player[]): [Team, Team] => {
  const sortedPlayers = [...players].sort((a, b) => calculatePlayerScore(b) - calculatePlayerScore(a));
  const team1: Player[] = [];
  const team2: Player[] = [];
  let team1Score = 0;
  let team2Score = 0;

  sortedPlayers.forEach((player) => {
    const playerScore = calculatePlayerScore(player);
    if (team1Score <= team2Score) {
      team1.push(player);
      team1Score += playerScore;
    } else {
      team2.push(player);
      team2Score += playerScore;
    }
  });

  return [
    { name: 'Team A', players: team1 },
    { name: 'Team B', players: team2 },
  ];
};