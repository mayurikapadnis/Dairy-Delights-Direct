import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import productsData from "../data/products";
import { X, Search } from "lucide-react";

const categoryList = [
  "All",
  "Milk",
  "Flavored Milk",
  "Lassi",
  "Cream",
  "Butter",
  "Ghee",
  "Cheese",
  "Yogurt",
  "Traditional",
  "Powder"
];

function Products() {
  const [category, setCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    setSearch(searchInput.trim());
  }

  function clearSearch() {
    setSearchInput("");
    setSearch("");
  }

  // Filter products by category and search
  const filtered = productsData.filter(product => {
    const matchCategory = category === "All" || product.category === category;
    const matchSearch = search === "" || product.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 pb-8 min-h-screen px-4 md:px-0">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center pt-12 mb-6">Our Products</h2>

          {/* Search Bar */}
          <form className="flex flex-col md:flex-row justify-center mb-6 gap-3 md:gap-0" onSubmit={handleSearch}>
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search for dairy products..."
                className="bg-white px-6 py-3 pr-10 rounded-lg shadow w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-600 px-8 py-3 text-white rounded-lg hover:bg-green-700 font-semibold shadow md:ml-2 transition transform active:scale-95 flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </form>

          {/* Category Filters */}
          <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex flex-wrap justify-center gap-2 min-w-max px-2">
              {categoryList.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors duration-200 ${category === cat
                    ? "bg-green-600 text-white border-green-600 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-600"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 px-6 md:px-8">
            <p className="text-gray-600">
              Showing <span className="font-bold text-gray-800">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
              {search && <span> for "<span className="font-semibold text-green-600">{search}</span>"</span>}
              {category !== "All" && <span> in <span className="font-semibold text-green-600">{category}</span></span>}
            </p>
          </div>

          {/* Product Grid or Empty State */}
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setCategory("All");
                  setSearch("");
                  setSearchInput("");
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium transition"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
