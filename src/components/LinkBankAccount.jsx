import React, { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import AuthNest from "../utils/apiConfig";
import { saveUserBankAccounts } from "../utils/apis";

function LinkBankAccount({ updateAccounts }) {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await AuthNest.post("/plaid/create_link_token");
        setLinkToken(response.data.linkToken);
      } catch (error) {
        console.error("Error creating link token:", error);
      }
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback(
    async (public_token, metadata) => {
      try {
        await AuthNest.post("/plaid/exchange_public_token", {
          publicToken: public_token,
        });
        await saveUserBankAccounts();
        updateAccounts();
      } catch (error) {
        console.error("Error exchanging public token:", error);
      }
    },
    [updateAccounts]
  );

  const config = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => open()}
        disabled={!ready}
        className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-300 
          ${
            ready
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
      >
        Link Bank Account
      </button>
    </div>
  );
}

export default LinkBankAccount;
