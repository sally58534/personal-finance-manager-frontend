import React, { useContext } from "react";
import { retrieveTransactions } from "../utils/apis";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CardCointainer from "./common/ui/CardContainer";
import CardGrid from "./common/ui/CardGrid";

// Define a component to show individual bank accounts
const BankAccounts = ({ accounts }) => {
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useContext(AuthContext);

  const goToBankAccountPage = async (account) => {
    showSpinner();
    try {
      const accountIds = account?.internalAccounts.map(
        (account) => account.account_id
      );
      const response = await retrieveTransactions(account.id, accountIds);
      
      hideSpinner();
      navigate("/transactions", {
        state: { transactions: response?.transactions, accounts },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardCointainer>
      <CardGrid className={"sm:grid-cols-2 lg:grid-cols-3"}>
        {accounts.map((account, idx) => (
          <div
            key={account.id}
            className="flex flex-col shadow-lg dark:shadow-slate-600 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer active:scale-95"
            onClick={() => goToBankAccountPage(account)}
          >
            {/* Display institution logo if available */}
            {account.institution.logo ? (
              <img
                src={account.institution.logo}
                alt={`${account.institution.name} logo`}
                className="w-full h-24 object-contain"
              />
            ) : (
              <img
                src="src/assets/logo-missing.webp"
                alt="Placeholder logo"
                className="w-full h-24 object-contain"
              />
            )}

            <div className="flex flex-col justify-between p-4 h-full">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex justify-between items-center">
                  {/* Bank name */}
                  <span>{account.institution.name}</span>
                </h3>

                {/* List of internal accounts */}
                <ul className="space-y-2">
                  {account.internalAccounts.map((internalAccount) => (
                    <li
                      key={internalAccount.account_id}
                      className="border-b border-gray-200 pb-2"
                    >
                      <strong>{internalAccount.name}</strong> (
                      {internalAccount.mask})
                      <br />
                      <span>
                        Balance: {internalAccount.balances.current}{" "}
                        {internalAccount.balances.iso_currency_code}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </CardGrid>
    </CardCointainer>
  );
};

export default BankAccounts;
