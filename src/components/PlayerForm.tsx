import React, { useState, useRef } from 'react';
import { Player } from '../types';

interface PlayerFormProps {
  onAddPlayer: (player: Player) => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ onAddPlayer }) => {
  const [player, setPlayer] = useState<Player>({
    id: '',
    name: '',
    position: '',
    photo: '',
    country: '',
    club: '',
    stats: {
      PAC: 50,
      DRI: 50,
      SHO: 50,
      DEF: 50,
      PAS: 50,
      PHY: 50,
    }
  });

  const [previews, setPreviews] = useState({
    photo: '',
    country: '',
    club: '',
  });

  const fileInputRefs = {
    photo: useRef<HTMLInputElement>(null),
    country: useRef<HTMLInputElement>(null),
    club: useRef<HTMLInputElement>(null),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPlayer({ ...player, [name]: reader.result as string });
          setPreviews({ ...previews, [name]: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    } else if (name in player.stats) {
      setPlayer({
        ...player,
        stats: { ...player.stats, [name]: parseInt(value) }
      });
    } else {
      setPlayer({ ...player, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlayer = { ...player, id: Date.now().toString() };
    onAddPlayer(newPlayer);
    setPlayer({
      id: '',
      name: '',
      position: '',
      photo: '',
      country: '',
      club: '',
      stats: {
        PAC: 50,
        DRI: 50,
        SHO: 50,
        DEF: 50,
        PAS: 50,
        PHY: 50,
      }
    });
    setPreviews({ photo: '', country: '', club: '' });
    Object.values(fileInputRefs).forEach(ref => {
      if (ref.current) ref.current.value = '';
    });
  };

  const handleFileButtonClick = (inputName: 'photo' | 'country' | 'club') => {
    fileInputRefs[inputName].current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Add New Player</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Player Name"
            value={player.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="position">
            Position
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="position"
            name="position"
            type="text"
            placeholder="Player Position"
            value={player.position}
            onChange={handleChange}
            required
          />
        </div>
        {['photo', 'country', 'club'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="file"
              id={field}
              name={field}
              accept="image/png, image/jpeg"
              onChange={handleChange}
              className="hidden"
              ref={fileInputRefs[field as keyof typeof fileInputRefs]}
            />
            <button
              type="button"
              onClick={() => handleFileButtonClick(field as 'photo' | 'country' | 'club')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Choose {field.charAt(0).toUpperCase() + field.slice(1)} File
            </button>
            {previews[field as keyof typeof previews] && (
              <img
                src={previews[field as keyof typeof previews]}
                alt={`${field} preview`}
                className="mt-2 w-full h-32 object-contain"
              />
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {Object.entries(player.stats).map(([stat, value]) => (
          <div key={stat} className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor={stat}>
              {stat}
            </label>
            <div className="flex items-center">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                id={`${stat}-input`}
                name={stat}
                type="number"
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
              />
              <input
                className="w-full"
                id={`${stat}-slider`}
                name={stat}
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          type="submit"
        >
          Add Player
        </button>
      </div>
    </form>
  );
};

export default PlayerForm;