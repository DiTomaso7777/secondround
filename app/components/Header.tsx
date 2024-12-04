"use client";

import { ClerkLoaded, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBox } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { user } = useUser();

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      {/* Top Row */}
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0">
          Second Round
        </Link>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Link
            href="/basket"
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6" />
            <span>My Basket</span>
          </Link>

          {/* User area */}
          <ClerkLoaded>
            {user && (
              <Link
                href="/orders"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <FontAwesomeIcon icon={faBox} className="w-6 h-6" />
                <span>My Orders</span>
              </Link>
            )}

          {user ? (
            <div className="flex items-center space-x-2">
              <UserButton />
              <div className="hidden sm:block text-xs">
                <p className="text-gray-400 border-blue-600">Welcome Back</p>
                <p className="font-bold">{user.fullName}!</p>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal">
                <button className="px-4 py-2 border border-black hover:bg-blue-600 transition-colors duration-300 rounded m-4 hover:text-white">
                  Sign In
                </button>
              </SignInButton>
          )}

            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
              >
                Create Passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;