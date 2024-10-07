import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartByCategory = ({ transactions }) => {
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const category = transaction?.category?.[0];
    if (!!category) {
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += -transaction.amount > 0 ? 0 : transaction.amount;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(groupedTransactions),
    datasets: [
      {
        label: "Total Amount",
        data: Object.values(groupedTransactions),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 shadow-lg rounded-lg mt-6 dark:shadow-slate-600">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartByCategory;
