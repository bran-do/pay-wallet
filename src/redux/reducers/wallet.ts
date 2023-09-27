import { AnyAction, combineReducers } from 'redux';

const INITIAL_STATE: any[] = [];

export function currenciesReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case 'STORE_CURRENCIES':
      return action.payload;
    default: return state;
  }
}

export function expensesReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case 'STORE_EXPENSE':
      return [...state, action.payload];
    case 'DELETE_EXPENSE':
      return state.filter((expense) => expense.id !== action.payload);
    default: return state;
  }
}

export function convertedExpensesReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case 'STORE_EXPENSE':
      return [...state, {
        amount: action.convertedExpense,
        id: action.payload.id }];
    case 'DELETE_EXPENSE':
      return state.filter((expense) => expense.id !== action.payload);
    default: return state;
  }
}

const wallet = combineReducers({
  currencies: currenciesReducer,
  expenses: expensesReducer,
  totalExpenses: convertedExpensesReducer,
});

export default wallet;
