import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type RootStateType = {
  user: UserType,
  wallet: WalletType,
};

export type UserType = {
  email: string,
};

export type WalletType = {
  currencies: [],
  expenses: [ExpenseType],
  totalExpenses: [],
  editor: boolean,
  idToEdit: number,
  editingRates: any,
};

export type ExpenseType = {
  value: any,
  currency: string,
  method: string,
  tag: string,
  description: string,
  id: number,
  exchangeRates: any,
};

export type Dispatch = ThunkDispatch<RootStateType, null, AnyAction>;
