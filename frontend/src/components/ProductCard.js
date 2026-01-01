import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded p-4 flex flex-col items-center">
      <img src={product.image} alt={product.name} className="h-52 mb-4" />
      <div className="bg-green-100 px-3 py-1 rounded text-green-800 text-xs mb-2">{product.category}</div>
      <h3 className="text-xl font-bold mb-1">{product.name}</h3>
      <p className="mb-2 text-gray-700">{product.description}</p>
      <div className="font-bold text-green-700 text-lg mb-1">{product.price}</div>
      <button
        onClick={() => addToCart(product)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center gap-1 w-full"
      >
        shopping_cart Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
