import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Pesquisar</h2>
      <div className="mb-4">
        <input
          id="titleSearch"
          type="text"
          placeholder="Buscar por título ou descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    
    </div>
  );
};

export default SearchBar;
