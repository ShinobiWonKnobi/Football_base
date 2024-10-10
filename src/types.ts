export interface Player {
  id: string;
  name: string;
  position: string;
  photo: string;
  stats: {
    PAC: number;
    DRI: number;
    SHO: number;
    DEF: number;
    PAS: number;
    PHY: number;
  };
}

export interface Team {
  name: string;
  players: Player[];
}