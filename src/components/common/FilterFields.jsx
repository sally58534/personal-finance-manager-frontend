import React, { useState } from "react";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const FilterFields = ({ categories, onFilter }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [category, setCategory] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const handleFilter = () => {
    const filters = {
      fromDate,
      toDate,
      category,
      minAmount,
      maxAmount,
    };
    onFilter(filters);
  };

  const resetFilters = () => {
    setCategory("");
    setFromDate("");
    setMaxAmount("");
    setMinAmount("");
    setToDate("");
  };

  return (
    <div className="bg-white dark:bg-gray-900 w-full p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {/* Date Fields */}
        <div>
          <label className="block font-semibold mb-2">Date From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inherit"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Date To
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inherit"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inherit"
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Fields */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Amount Min
          </label>
          <input
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            placeholder="Min amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none bg-inherit focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Amount Max
          </label>
          <input
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            placeholder="Max amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none bg-inherit focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filter and Reset Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleFilter}
          className="w-1/3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="w-1/3 bg-inherit text-gray-500 border-white border-none font-bold px-4 py-2 outline"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterFields;
