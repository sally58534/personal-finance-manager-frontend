import React, { useEffect, useState } from "react";
import Page from "../common/Page";
import LinkBankAccount from "../LinkBankAccount";
import { getUserBankAccounts, retrieveTransactions } from "../../utils/apis";
import BankAccounts from "../BankAccounts";
import TransactionTable from "../TransactionTable";
import CardCointainer from "../common/ui/CardContainer";
import CardGrid from "../common/ui/CardGrid";
import PieChart from "../PieChart";
import BarChartByCategory from "../BarChart";
import SearchBar from "../common/SearchBar";
import FilterFields from "../common/FilterFields";

const SelectAccountPage = () => {
  const [loading, setLoading] = useState(false);
  const [userBankAccounts, setUserBankAccounts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [showAllFilters, setShowAllFilters] = useState(false);

  const onSearchTransaction = (query) => {
    const transFromSS = JSON.parse(sessionStorage.getItem("transactions"));
    setAllTransactions(
      transFromSS.filter((transaction) =>
        transaction.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const applyFilters = (filters) => {
    const transFromSS = JSON.parse(sessionStorage.getItem("transactions"));
    setAllTransactions(
      transFromSS.filter((transaction) => {
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

  useEffect(() => {
    async function getAccountsAndTransactions() {
      setLoading(true);

      try {
        const bankAccounts = !!sessionStorage.getItem("bankAccounts")
          ? JSON.parse(sessionStorage.getItem("bankAccounts"))
          : await getUserBankAccounts();
        setUserBankAccounts(bankAccounts);
        if (!sessionStorage.getItem("bankAccounts")) {
          sessionStorage.setItem("bankAccounts", JSON.stringify(bankAccounts));
        }

        if (!!sessionStorage.getItem("transactions")) {
          setAllTransactions(
            JSON.parse(sessionStorage.getItem("transactions"))
          );
        } else {
          const allTrans = await Promise.all(
            bankAccounts.map(async (account) => {
              const accountIds = account.internalAccounts.map(
                (intAccount) => intAccount.account_id
              );
              const res = await retrieveTransactions(account.id, accountIds);
              return res.transactions;
            })
          );

          setAllTransactions(allTrans.flat());
          sessionStorage.setItem(
            "transactions",
            JSON.stringify(allTrans.flat())
          );
        }
      } catch (error) {
        console.error("Error fetching accounts or transactions", error);
      } finally {
        setLoading(false);
      }
    }

    getAccountsAndTransactions();
  }, [update]);

  return (
    <Page>
      <div className="row justify-content-center">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div>
            {!!userBankAccounts.length ? (
              <>
                <div className="flex w-full justify-between mb-6">
                  <SearchBar onSearch={onSearchTransaction} />
                  <div className="flex justify-end m-auto">
                    <button
                      className="bg-black text-white px-4 rounded-lg hover:bg-gray-800 transition duration-300"
                      onClick={() =>
                        setShowAllFilters((prevState) => !prevState)
                      }
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
                        allTransactions
                          .map((transaction) =>
                            transaction.category ? transaction.category : "N/A"
                          )
                          .flat()
                      ),
                    ]}
                  />
                )}
                <TransactionTable transactions={allTransactions} />
                <CardCointainer>
                  <CardGrid>
                    <PieChart transactions={allTransactions} />
                    <BarChartByCategory transactions={allTransactions} />
                  </CardGrid>
                </CardCointainer>
                <BankAccounts accounts={userBankAccounts} />
              </>
            ) : (
              <div>Connect your first bank account to get started</div>
            )}
            <LinkBankAccount updateAccounts={() => setUpdate(true)} />
          </div>
        )}
      </div>
    </Page>
  );
};

export default SelectAccountPage;
