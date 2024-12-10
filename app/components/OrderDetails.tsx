import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../lib/fetchOrders';
import { formatDateTime } from '../lib/formatDateTime';

interface OrderDetailsProps {
  orderNumber: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderNumber }) => {
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        console.log(`Fetching order data for order number: ${orderNumber}`);
        const data = await fetchOrders(Number(orderNumber));
        console.log('Fetched order data:', data);
        setOrderData(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching order data:', err.message);
          setError(err.message);
        } else {
          console.error('An unknown error occurred');
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getOrderData();
  }, [orderNumber]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const order = orderData?.orders?.order[0];
  const rows = order?.rows[0]?.row;

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Order Details</h1>
    <div className="flex flex-col md:flex-row gap-4">
      <div className="bg-white shadow-md rounded-lg p-4 md:w-1/2">
        <h2 className="text-xl font-semibold mb-2">Order Information</h2>
        <p><strong>Order Number:</strong> {order.$.number}</p>
        <p><strong>Customer Code:</strong> {order.$.customercode}</p>
        <p><strong>Customer Name:</strong> {order.$.customername}</p>
        <p><strong>Date:</strong> {formatDateTime(order.$.date)}</p>
        <p><strong>Payment Term:</strong> {order.$.paymentterm}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 md:w-1/2">
        <h2 className="text-xl font-semibold mb-2">Order Items</h2>
        <div className="grid grid-cols-1 gap-4">
          {rows.map((row: any, index: number) => (
            <div key={index} className="bg-blue-200 shadow-md rounded-lg p-4">
              <p><strong>Item:</strong> {row.$.item}</p>
              <p><strong>Price:</strong> {row.$.price} €</p>
              <p><strong>Serial Number:</strong> {row.$.sn}</p>
              <p><strong>Quantity:</strong> {row.$.quantity}</p>
              <p><strong>Row Number:</strong> {row.$.rn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

export default OrderDetails;