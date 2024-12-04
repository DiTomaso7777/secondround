export const searchStockByName = async (query: string, page: number, limit: number) => {
  try {
    const response = await fetch(`/api/query/${encodeURIComponent(query)}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Error fetching stock data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};