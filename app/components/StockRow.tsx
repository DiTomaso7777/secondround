"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface StockRowProps {
  name: string;
  salesprice: string;
  quantity: string;
}

const StockRow: React.FC<StockRowProps> = ({ name, salesprice, quantity }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rowRef.current) {
      gsap.fromTo(
        rowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  // Split the name and grade information
  const [productName, grade] = name.split(',');

  return (
    <div className="container mx-auto p-1 bg-white shadow-lg rounded-xl overflow-hidden hover:bg-blue-200 transition duration-300">
      <div ref={rowRef} className="flex flex-col md:flex-row">
        {/* Product Name */}
        <div className="flex items-center space-x-1 p-1 w-full md:w-1/4 min-w-0">
          <h3 className="text-lg font-semibold truncate w-full">{productName}</h3>
        </div>

        {/* Grade (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-1 p-1 w-full md:w-1/4">
          <p className="text-lg">{grade}</p>
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-center text-center p-1 w-full md:w-1/4 space-x-2">
          <p className="text-lg">Quantity:</p>
          <p className="text-xl font-bold text-blue-600">{quantity}</p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-end p-1 w-full md:w-1/4">
          <p className="text-gray-700">Price: {salesprice} €</p>
        </div>
      </div>
    </div>
  );
};

export default StockRow;