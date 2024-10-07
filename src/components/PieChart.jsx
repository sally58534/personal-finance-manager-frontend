import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ transactions }) => {
  const incomes = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const outcomes = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  const data = {
    labels: ["Incomes", "Outcomes"],
    datasets: [
      {
        label: "Transactions",
        data: [incomes, outcomes],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverBackgroundColor: ["#66BB6A", "#E57373"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full dark:shadow-slate-600 max-w-md mx-auto p-6 shadow-lg rounded-lg mt-6">
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
