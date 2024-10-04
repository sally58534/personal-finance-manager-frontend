import React, { useState } from "react";
import Page from "../common/Page";
import TransactionTable from "../TransactionTable";
import { useLocation } from "react-router-dom";
import PieChart from "../PieChart";
import BarChartByCategory from "../BarChart";
import Spacer from "../common/Spacer";
import CardCointainer from "../common/ui/CardContainer";
import CardGrid from "../common/ui/CardGrid";
import BankAccounts from "../BankAccounts";
import SearchBar from "../common/SearchBar";
import FilterFields from "../common/FilterFields";
import moment from "moment";

const TransactionPage = () => {
  const location = useLocation();
  const { transactions, accounts } = location.state;
  const [transactionsState, setTransactionState] = useState(transactions);
  const [showAllFilters, setShowAllFilters] = useState(false);

  const onSearchTransaction = (query) => {
    setTransactionState(
      transactions.filter((transaction) =>
        transaction.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const applyFilters = (filters) => {
    setTransactionState(
      transactions.filter((transaction) => {
        let isMatch = true;

        // Category filter
        if (!!filters?.category) {
          isMatch = isMatch && transaction.category.includes(filters.category);
        }

        // Minimum amount filter
        if (!!filters?.minAmount) {
          isMatch =
            isMatch && Math.abs(transaction.amount) >= filters.minAmount;
        }

        // Maximum amount filter
        if (!!filters?.maxAmount) {
          isMatch =
            isMatch && Math.abs(transaction.amount) <= filters.maxAmount;
        }

        // Date range filter
        if (!!filters?.fromDate) {
          const fromDate = moment(filters.fromDate);
          const transactionDate = moment(transaction.date);

          isMatch = isMatch && transactionDate.isSameOrAfter(fromDate);
        }
        if (!!filters?.toDate) {
          const toDate = moment(filters.toDate);
          const transactionDate = moment(transaction.date);

          isMatch = isMatch && transactionDate.isSameOrBefore(toDate);
        }

        return isMatch;
      })
    );
  };

  return (
    <Page>
      <Spacer />
      <div className="flex w-full justify-between mb-6">
        <SearchBar onSearch={onSearchTransaction} />
        <div className="flex justify-end m-auto">
          <button
            className="bg-black text-white px-4 rounded-lg hover:bg-gray-800 transition duration-300"
            onClick={() => setShowAllFilters((prevState) => !prevState)}
          >
            {showAllFilters ? "Hide filters" : "Show all filters"}
          </button>
        </div>
      </div>
      {showAllFilters && (
        <FilterFields
          onFilter={applyFilters}
          categories={[
            ...new Set(
              transactions
                .map((transaction) =>
                  transaction.category ? transaction.category : "N/A"
                )
                .flat()
            ),
          ]}
        />
      )}
      <TransactionTable transactions={transactionsState} />
      <CardCointainer>
        <CardGrid>
          <PieChart transactions={transactions} />
          <BarChartByCategory transactions={transactions} />
        </CardGrid>
      </CardCointainer>
      <BankAccounts accounts={accounts} />
    </Page>
  );
};

export default TransactionPage;
