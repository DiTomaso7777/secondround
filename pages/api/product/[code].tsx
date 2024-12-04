import { useRouter } from 'next/router';
import { useState } from 'react';

const ProductDetailsPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [quantity, setQuantity] = useState<number>(1); // Default quantity
  const salesprice = 100; // Example price, replace with actual data

  const handleQuantityChange = (amount: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const totalPrice = quantity * salesprice;

  return (
    <div className="flex flex-col md:flex-row p-4">
      {/* Left Side: Account Manager Information */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Account Manager</h2>
        <p>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
        <p>Phone: +1234567890</p>
      </div>

      {/* Right Side: Product Details */}
      <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <p>Product Code: {code}</p>
        <p>Product Name: Example Product</p> {/* Replace with actual product name */}
        <p>Price per Item: {salesprice} €</p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          >
            -
          </button>
          <p className="text-xl font-bold">{quantity}</p>
          <button
            onClick={() => handleQuantityChange(1)}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          >
            +
          </button>
        </div>
        <p className="text-xl font-bold mt-4">Total Price: {totalPrice} €</p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;