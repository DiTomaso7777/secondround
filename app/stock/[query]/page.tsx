"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import StockRow from "../../components/StockRow";
import { searchStockByName } from "../../lib/stock/searchStockByName";

const StockSearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams ? searchParams.get("query") : null;

  const [stockData, setStockData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (query) {
      console.log(`Fetching results for query: ${query}`); // Debug
      setPage(1); // Reset pagination
      fetchStockData(true);
    }
  }, [query]);

  const fetchStockData = async (reset = false) => {
    if (!query) return;
    if (loading) return;

    setLoading(true);
    try {
      const currentPage = reset ? 1 : page;
      console.log(`Fetching page ${currentPage} for query: "${query}"`); // Debug
      const data = await searchStockByName(query, currentPage, ITEMS_PER_PAGE);

      console.log("Fetched data:", data); // Debug fetched data
      if (reset) {
        setStockData(data);
      } else {
        setStockData((prev) => [...prev, ...data]);
      }

      setHasMore(data.length === ITEMS_PER_PAGE);
    } catch (err) {
      console.error("Error fetching stock data:", err);
      setError("Error fetching stock data");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchStockData();
    }
  }, [page]);

  if (loading && page === 1) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!stockData.length) {
    return (
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            No stock found {query ? `for "${query}"` : ""}
          </h1>
          <p className="text-gray-600 text-center">Try searching for something else</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Search results for {query}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {stockData.map((item, index) => (
          <StockRow
            key={item.code || index}
            name={item.name || "Unknown, Grade"}
            salesprice={item.salesprice || "N/A"}
            quantity={item.quantity?.toString() || "0"}
          />
        ))}
      </div>
      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default StockSearchPage;
