import React from 'react';

interface SearchBoxProps {
  area: string;
  setArea: (area: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ area, setArea, onSearch, loading }) => (
  <form
    className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center mb-8"
    onSubmit={e => {
      e.preventDefault();
      onSearch();
    }}
  >
    <input
      type="text"
      value={area}
      onChange={e => setArea(e.target.value)}
      placeholder="Search for a neighborhood..."
      className="w-full sm:w-80 px-4 py-2 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-900 text-zinc-100"
      disabled={loading}
    />
    <button
      type="submit"
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
      disabled={loading}
    >
      {loading ? 'Searching...' : 'Search'}
    </button>
  </form>
);

export default SearchBox;
