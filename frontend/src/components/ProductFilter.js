import React from 'react';

function ProductFilter({ selectedCategory, setCategory, categories }) {
  return (
    <div className="flex space-x-2 overflow-x-auto py-4 px-8 bg-gray-50">
      {categories.map(cat => (
        <button
          key={cat}
          className={`px-4 py-2 rounded-full border ${selectedCategory === cat ? 'bg-green-600 text-white' : 'bg-white text-gray-700'}`}
          onClick={() => setCategory(cat)}
        >{cat}</button>
      ))}
    </div>
  );
}
export default ProductFilter;
