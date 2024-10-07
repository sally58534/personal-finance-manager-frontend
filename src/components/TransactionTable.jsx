import React, { useState } from "react";

const TransactionTable = ({ transactions }) => {
  const [visibleCount, setVisibleCount] = useState(10);

  console.log(transactions);
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <div className="pb-4 w-full shadow-lg dark:shadow-slate-600 rounded-lg mt-6">
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Logo
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Channel
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Currency
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.slice(0, visibleCount).map((transaction) => (
              <tr
                key={transaction.transaction_id}
                className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 dark:text-white"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {transaction.logo_url ? (
                    <img
                      src={transaction.logo_url}
                      alt={transaction.name}
                      className="w-12 h-12 object-contain mx-auto"
                    />
                  ) : (
                    <span className="text-gray-400">No Logo</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {transaction.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {transaction.category
                    ? transaction.category.join(", ")
                    : "N/A"}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap font-bold text-sm ${
                    transaction.amount > 0 ? "text-red-500" : "text-green-500"
                  } `}
                >
                  {Math.abs(transaction.amount)}
                  {(transaction.iso_currency_code === "EUR" && "€") || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {transaction.payment_channel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {transaction.iso_currency_code || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleCount < transactions.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;
