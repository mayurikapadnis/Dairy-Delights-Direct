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
      <div className="bg-gray-50 pb-8 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center pt-12 mb-2">Our Products</h2>
          <form className="flex justify-center mb-4" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search for dairy products..."
              className="bg-white px-6 py-3 rounded shadow w-full md:w-1/2"
            />
            <button
              type="submit"
              className="ml-2 bg-green-600 px-5 py-3 text-white rounded hover:bg-green-700 font-semibold"
            >
              Search
            </button>
          </form>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categoryList.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  category === cat ? "bg-green-600 text-white" : "bg-white text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <ProductGrid products={filtered} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
