import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, activeMenu }) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <input
        type="text"
        placeholder={`ค้นหาข้อมูล${activeMenu === 'branches' ? 'สาขา' : activeMenu}...`}
        className="flex-1 p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;