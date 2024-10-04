import { Endpoints } from "../Endpoints";
import AuthNest from "./apiConfig";

export const loginApi = async (email, password) => {
  try {
    const response = await AuthNest.post(Endpoints.login, { email, password });
    const token = response.data.access_token;
    return Promise.resolve(token);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registerApi = async (email, password) => {
  try {
    const response = await AuthNest.post(Endpoints.register, {
      email,
      password,
    });
    const data = response.data;
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserBankAccounts = async () => {
  try {
    const response = await AuthNest.get(Endpoints.getUserBankAccounts);
    const data = response.data;
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const saveUserBankAccounts = async () => {
  try {
    const response = await AuthNest.patch(Endpoints.saveUserAccounts);
    const data = response.data;
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const retrieveTransactions = async (
  accountId,
  accountIds,
  startDate,
  endDate
) => {
  try {
    const response = await AuthNest.post(Endpoints.retrieveTransactions, {
      accountId,
      startDate,
      endDate,
      accountIds
    });
    const data = response.data;
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error)
  }
}