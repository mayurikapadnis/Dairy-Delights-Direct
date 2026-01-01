import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

function ProductGrid({ products }) {
  const { addToCart } = useCart();
  const [addedProductName, setAddedProductName] = useState("");

  const handleAddToCart = product => {
    addToCart(product);
    setAddedProductName(product.name);

    // Clear message after 2 seconds
    setTimeout(() => setAddedProductName(""), 2000);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-8">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col">
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded-t-lg"
            />
            <div className="p-4">
              <span className="block mb-1 px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                {product.category}
              </span>
              <h3 className="font-bold text-lg mb-1">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-green-700 font-bold text-xl">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="line-through text-gray-500 text-md">₹{product.oldPrice}</span>
                )}
              </div>
              {product.discount && (
                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                  {product.discount}
                </span>
              )}
              <div className="flex items-center text-yellow-500 my-2">
                {Array(4)
                  .fill()
                  .map((_, i) => (
                    <span key={i} className="material-icons text-sm">
                      star
                    </span>
                  ))}
                <span className="text-gray-600 ml-2 text-xs">({product.reviews} reviews)</span>
              </div>
              <button
                className="w-full bg-green-600 text-white py-2 rounded mt-2 flex items-center justify-center space-x-2 hover:bg-green-700"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup notification */}
      {addedProductName && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg transition-opacity">
          Added "{addedProductName}" to cart!
        </div>
      )}
    </>
  );
}

export default ProductGrid;
