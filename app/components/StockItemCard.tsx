"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useUser, ClerkLoaded } from '@clerk/nextjs';
import AddToCartButton from './AddToCartButton';

interface StockItemCardProps {
  item: {
    code: string;
    name: string;
    salesprice: string;
    quantity: string;
  };
}

const StockItemCard: React.FC<StockItemCardProps> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  // Split the name and grade information
  const [productName, grade] = item.name.split(',');
  const { user } = useUser();

  return (
    <div ref={cardRef} className="p-4 bg-white shadow-lg rounded-xl overflow-hidden hover:bg-blue-200 transition duration-300">
      <div className="flex flex-col space-y-2">
        {/* Product Name */}
        <h3 className="text-lg font-semibold truncate">{productName}</h3>

        {/* Grade */}
        <p className="text-lg">{grade}</p>

        {/* Quantity */}
        <div className="flex items-center justify-between">
          <p className="text-lg">Quantity:</p>
          <p className="text-xl font-bold text-blue-600">{item.quantity}</p>
        </div>

        {/* Price */}
        <ClerkLoaded>
          <div className="flex items-center justify-between">
            {user ? (
              <p className="text-gray-700">Price: {item.salesprice} €</p>
            ) : (
              <p className="text-gray-700">Price: ---</p>
            )}
          </div>
        </ClerkLoaded>

        {/* Add to Cart Button */}
        <AddToCartButton item={{ code: item.code, name: productName, price: parseFloat(item.salesprice) }} />
      </div>
    </div>
  );
};

export default StockItemCard;