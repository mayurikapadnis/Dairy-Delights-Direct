import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid"; // render products grid
import productsData from "../data/products";

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
          <form className="flex flex-col md:flex-row justify-center mb-8 gap-3 md:gap-0" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search for dairy products..."
              className="bg-white px-6 py-3 rounded-lg shadow w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <button
              type="submit"
              className="bg-green-600 px-8 py-3 text-white rounded-lg hover:bg-green-700 font-semibold shadow md:ml-2 transition transform active:scale-95"
            >
              Search
            </button>
          </form>

          <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
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
          <ProductGrid products={filtered} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
