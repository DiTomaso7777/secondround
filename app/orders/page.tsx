"use client";

import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../lib/fetchOrders';
import OrderDetails from '../components/OrderDetails';

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders(1); // Pass a valid argument
        setOrders(data.orders.order); // Assuming the API returns an array of orders
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.map((order: any) => (
        <OrderDetails key={order.$.number} orderNumber={order.$.number} />
      ))}
    </div>
  );
};

export default OrdersPage;