import React from 'react';
import { useRouter } from 'next/router';

interface NavigateButtonProps {
  code: string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ code }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/product/${code}`);
  };

  return (
    <button
      onClick={handleButtonClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      View Details
    </button>
  );
};

export default NavigateButton;