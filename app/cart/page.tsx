"use client";

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { state, dispatch } = useCart();
  const [comment, setComment] = useState('');

  const handleRemoveItem = (code: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { code } });
  };

  const handleIncreaseQuantity = (code: string) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { code } });
  };

  const handleDecreaseQuantity = (code: string) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: { code } });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Calculate total price
  const calculateTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {state.items.map((item) => (
            <div key={item.code} className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
              <div>
                <p><strong>Item:</strong> {item.name}</p>
                <p><strong>Price:</strong> {item.price.toFixed(2)} €</p>
                <div className="flex items-center space-x-2 mt-2">
                  <strong>Quantity:</strong>
                  <button 
                    onClick={() => handleDecreaseQuantity(item.code)}
                    className="bg-gray-200 px-2 rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleIncreaseQuantity(item.code)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    +
                  </button>
                </div>
                <p><strong>Subtotal:</strong> {(item.price * item.quantity).toFixed(2)} €</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.code)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <p className="text-xl font-bold">
              Total: {calculateTotal()} €
            </p>

           {/* Comment Field */}
           <div className="mt-4">
                <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
                Additional Comments:
                </label>
                    <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter any additional notes or instructions here..."
                    rows={4}
                    />
            </div>

          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleClearCart}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Clear Cart
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

           
    </div>
  );
};

export default CartPage;