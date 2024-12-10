import React from 'react';
import { useCart } from '../context/CartContext';

interface AddToCartButtonProps {
  item: {
    code: string;
    name: string;
    price: number;
  };
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    console.log('AddToCartButton - Attempting to add item:', JSON.stringify(item, null, 2));
    
    // Extremely verbose validation
    console.log('Item code:', item.code);
    console.log('Item code type:', typeof item.code);
    console.log('Item code length:', item.code?.length);
    console.log('Item code is truthy:', !!item.code);

    // More aggressive validation
    if (!item.code || item.code.trim() === '') {
      console.error('ERROR: Invalid item code', {
        code: item.code,
        codeType: typeof item.code,
        codeLength: item.code?.length
      });
      alert('Invalid item: Missing product code');
      return;
    }

    if (!item.name || item.name.trim() === '') {
      console.error('ERROR: Invalid item name', item.name);
      alert('Invalid item: Missing product name');
      return;
    }

    if (typeof item.price !== 'number' || item.price <= 0) {
      console.error('ERROR: Invalid item price', item.price);
      alert('Invalid item: Invalid price');
      return;
    }

    try {
      // Ensure all fields are present and valid
      const cartItem = {
        code: item.code.toString().trim(),
        name: item.name.trim(),
        price: Number(item.price),
        quantity: 1
      };

      console.log('Dispatching item:', JSON.stringify(cartItem, null, 2));

      dispatch({ 
        type: 'ADD_ITEM', 
        payload: cartItem
      });

      console.log('Item successfully added to cart');
    } catch (error) {
      console.error('CRITICAL: Failed to add item to cart', error);
      alert('Failed to add item to cart');
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;