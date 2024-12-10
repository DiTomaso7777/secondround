"use client"

import React, { createContext, useContext, useReducer } from 'react';

interface CartItem {
  code: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartActionType = 
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { code: string } }
  | { type: 'INCREASE_QUANTITY'; payload: { code: string } }
  | { type: 'DECREASE_QUANTITY'; payload: { code: string } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

const validateCartItem = (item: CartItem): boolean => {
  if (!item) {
    console.error('Invalid item: null or undefined');
    return false;
  }

  if (!item.code || typeof item.code !== 'string' || item.code.trim() === '') {
    console.error('Invalid item code:', item.code);
    return false;
  }

  if (!item.name || typeof item.name !== 'string' || item.name.trim() === '') {
    console.error('Invalid item name:', item.name);
    return false;
  }

  if (typeof item.price !== 'number' || item.price <= 0) {
    console.error('Invalid item price:', item.price);
    return false;
  }

  if (typeof item.quantity !== 'number' || item.quantity < 1) {
    console.error('Invalid item quantity:', item.quantity);
    return false;
  }

  return true;
};

const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Validate the incoming item
      if (!validateCartItem(action.payload)) {
        console.error('Attempted to add invalid item:', action.payload);
        return state;
      }

      const existingItemIndex = state.items.findIndex(
        item => item.code === action.payload.code
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
        };

        return {
          ...state,
          items: updatedItems,
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.code !== action.payload.code),
      };
    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item => 
          item.code === action.payload.code 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case 'DECREASE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item => 
          item.code === action.payload.code 
            ? { 
                ...item, 
                quantity: Math.max(1, item.quantity - 1) 
              }
            : item
        ).filter(item => item.quantity > 0),
      };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};