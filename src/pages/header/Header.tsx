import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (title: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(title);
  };

  return (
    <header className="w-full flex flex-col items-center justify-center">
      <h1
        className="text-8xl font-bold text-red-600 mb-2 text-center pb-4"
        style={{ fontFamily: 'Bebas Neue' }}
      >
        Movie finder
      </h1>
      <div className="mt-4 mb-4 px-4 max-w-4xl mx-auto text-center text-white">
        <h1 className="text-4xl font-bold">
          Découvrez et discutez des films et séries du monde entier
        </h1>
        <p className="text-2xl mt-4 pb-10">
          Recherchez un film ou une série et discutez avec le monde entier
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 flex items-center justify-center"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Search for a movie..."
        />
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
        >
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;
