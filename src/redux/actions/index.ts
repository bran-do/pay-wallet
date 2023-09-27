import { Dispatch, ExpenseType } from '../types';

export const storeEmailAction = (email: string) => ({
  type: 'STORE_EMAIL',
  payload: email,
});

export const storeCurrenciesAction = (currencies: string[]) => ({
  type: 'STORE_CURRENCIES',
  payload: currencies,
});

export const fetchCurrenciesAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;

      dispatch(storeCurrenciesAction(Object.keys(data)));
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const fetchExchangeRatesAction = (expense: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;

      dispatch(storeExpenseAction(expense, data));
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const storeExpenseAction = (newExpense: ExpenseType, newRates: any) => ({
  type: 'STORE_EXPENSE',
  payload: {
    id: newExpense.id,
    value: newExpense.value,
    currency: newExpense.currency,
    description: newExpense.description,
    method: newExpense.method,
    tag: newExpense.tag,
    exchangeRates: newRates,
  },
  convertedExpense: (
    newExpense.value * newRates[newExpense.currency].ask
  ),
});

export const deleteExpenseAction = (id: number) => ({
  type: 'DELETE_EXPENSE',
  payload: id,
});

export const editFormBoolAction = (bool: boolean) => ({
  type: 'EDITING_EXPENSE',
  payload: bool,
});

export const storeEditIdAction = (id: number) => ({
  type: 'STORE_EXPENSE_EDIT_ID',
  payload: id,
});

export const storeEditRatesAction = (rates: any) => ({
  type: 'STORE_EXPENSE_EDIT_RATES',
  payload: rates,
});

export const overwriteExpenseAction = (newExpense: ExpenseType, rates: any) => ({
  type: 'OVERWRITE_EXPENSE',
  payload: {
    id: newExpense.id,
    value: newExpense.value,
    currency: newExpense.currency,
    description: newExpense.description,
    method: newExpense.method,
    tag: newExpense.tag,
    exchangeRates: rates,
  },
  convertedExpense: (
    newExpense.value * rates[newExpense.currency].ask
  ),
});

// export const storeEditedExpenseAction = (newExpense: ExpenseType) {

// }
