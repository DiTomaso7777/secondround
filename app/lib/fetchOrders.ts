export const fetchOrders = async (orderNumber: number) => {
  try {
    const response = await fetch(`/api/order/${orderNumber}`);
    if (!response.ok) {
      throw new Error('Error fetching order data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order data:', error);
    throw error;
  }
};