import { AnyAction, combineReducers } from 'redux';

const INITIAL_STATE_1: any[] = [];

export function currenciesReducer(state = INITIAL_STATE_1, action: AnyAction) {
  switch (action.type) {
    case 'STORE_CURRENCIES':
      return action.payload;
    default: return state;
  }
}

export function expensesReducer(state = INITIAL_STATE_1, action: AnyAction) {
  switch (action.type) {
    case 'STORE_EXPENSE':
      return [...state, action.payload];
    default: return state;
  }
}

export function convertedExpensesReducer(state = INITIAL_STATE_1, action: AnyAction) {
  switch (action.type) {
    case 'STORE_CONVERTED_EXPENSE':
      return [...state, action.payload];
    default: return state;
  }
}

const wallet = combineReducers({
  currencies: currenciesReducer,
  expenses: expensesReducer,
  totalExpenses: convertedExpensesReducer,
});

export default wallet;
