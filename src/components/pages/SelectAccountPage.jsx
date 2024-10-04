import React, { useEffect, useState } from "react";
import Page from "../common/Page";
import LinkBankAccount from "../LinkBankAccount";
import { getUserBankAccounts } from "../../utils/apis";
import BankAccounts from "../BankAccounts";

const SelectAccountPage = () => {
  const [loading, setLoading] = useState(false);
  const [userBankAccounts, setUserBankAccounts] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function getAccounts() {
      setLoading(true);
      await getUserBankAccounts()
        .then((res) => setUserBankAccounts(res))
        .finally(() => setLoading(false));
    }

    getAccounts();
  }, [update]);

  return (
    <Page>
      <div className="row justify-content-center">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div>
            <BankAccounts accounts={userBankAccounts} />
            <LinkBankAccount updateAccounts={() => setUpdate(true)} />
          </div>
        )}
      </div>
    </Page>
  );
};

export default SelectAccountPage;
