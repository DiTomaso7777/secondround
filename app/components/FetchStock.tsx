"use client";

import { useEffect, useState } from "react";
import { parseXmlData } from "../utils/parseXml";
import StockRow from "../components/StockRow";

const FetchStock = () => {
  const [stockData, setStockData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedQuantityRange, setSelectedQuantityRange] = useState<string>("All");
  const [selectedModel, setSelectedModel] = useState<string>("All");
  const [selectedGrade, setSelectedGrade] = useState<string>("All");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/stock");
        const xmlText = await response.text();

        let cleanedXmlText = xmlText.replace(/^[\s\S]*?(<\?xml)/, "$1").trim();
        cleanedXmlText = cleanedXmlText.replace(/\\"/g, '"');

        try {
          const result = (await parseXmlData(cleanedXmlText)) as any;
          setStockData(result);
        } catch (parseError) {
          setError(`Error parsing cleaned XML: ${parseError}`);
        }

        setLoading(false);
      } catch (err) {
        setError(`Error fetching data: ${err}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const aggregatedData = stockData?.stocklevels?.stocklevel.reduce((acc: any, item: any) => {
    const code = item.$.code;
    if (!acc[code]) {
      acc[code] = { ...item.$ };
    }
    return acc;
  }, {});

  const aggregatedDataArray = Object.entries(aggregatedData || {}).map(([code, item]) => ({
    code,
    name: (item as any).name,
    quantity: parseInt((item as any).quantity, 10),
    ...(typeof item === "object" ? item : {}),
  }));

  aggregatedDataArray.sort((a, b) => b.quantity - a.quantity);

  const filteredData = aggregatedDataArray.filter((item) => {
    const quantityFilter =
      selectedQuantityRange === "All" ||
      (selectedQuantityRange === "0-50" && item.quantity >= 0 && item.quantity <= 50) ||
      (selectedQuantityRange === "50-100" && item.quantity > 50 && item.quantity <= 100) ||
      (selectedQuantityRange === "100+" && item.quantity > 100);

    const modelFilter =
      selectedModel === "All" ||
      (item.name && item.name.toLowerCase().includes(selectedModel.toLowerCase()));

    const gradeFilter =
      selectedGrade === "All" ||
      (item.name && item.name.toUpperCase().includes(`GRADE ${selectedGrade}`));

    return quantityFilter && modelFilter && gradeFilter;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleQuantityRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuantityRange(event.target.value);
    setCurrentPage(1);
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
    setCurrentPage(1);
  };

  const handleGradeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGrade(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-4">Today we have:</h2>

        {/* Filters */}
        <div className="flex max-w-full flex-wrap gap-4 mb-4 border border-gray-300 p-4 rounded-lg shadow-sm">
          {/* Quantity Range Filter Dropdown */}
          <div>
            <label htmlFor="quantityFilter" className="block text-sm font-medium text-gray-700">
              Filter by Quantity:
            </label>
            <select
              id="quantityFilter"
              value={selectedQuantityRange}
              onChange={handleQuantityRangeChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="All">All</option>
              <option value="0-50">0-50</option>
              <option value="50-100">50-100</option>
              <option value="100+">More than 100</option>
            </select>
          </div>

          {/* Model Filter Dropdown */}
          <div>
            <label htmlFor="modelFilter" className="block text-sm font-medium text-gray-700">
              Filter by Model:
            </label>
            <select
              id="modelFilter"
              value={selectedModel}
              onChange={handleModelChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="All">All</option>
              <option value="Iphone 15">Iphone 15</option>
              <option value="Iphone 14">Iphone 14</option>
              <option value="Iphone 13">Iphone 13</option>
              <option value="Iphone 12">Iphone 12</option>
            </select>
          </div>

          {/* Grade Filter Dropdown */}
          <div>
            <label htmlFor="gradeFilter" className="block text-sm font-medium text-gray-700">
              Filter by Grade:
            </label>
            <select
              id="gradeFilter"
              value={selectedGrade}
              onChange={handleGradeChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="All">All</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>

        {/* Stock Rows */}
        {currentItems.length > 0 ? (
          <div className="space-y-4">
            {currentItems.map((item: any, index: number) => (
              <StockRow
                key={`${item.code}-${index}`}
                code={item.code}
                name={item.name}
                salesprice={item.salesprice}
                quantity={item.quantity.toString()}             />
            ))}
          </div>
        ) : (
          <p>No stock data available.</p>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            }`}
          >
            Next Page
          </button>
        </div>

        {/* Page Indicator */}
        <div className="text-center mt-2 text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default FetchStock;
