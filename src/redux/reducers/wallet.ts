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
    case 'OVERWRITE_EXPENSE':
      return [
        action.payload,
        ...state.filter((expense) => expense.id !== action.payload.id),
      ];
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
    case 'OVERWRITE_EXPENSE':
      return [
        {
          amount: action.convertedExpense,
          id: action.payload.id,
        },
        ...state.filter((expense) => expense.id !== action.payload.id),
      ];
    default: return state;
  }
}

export function editFormBoolReducer(state = false, action: AnyAction) {
  switch (action.type) {
    case 'EDITING_EXPENSE':
      return action.payload;
    default:
      return state;
  }
}

export function storeEditIdReducer(state = 0, action: AnyAction) {
  switch (action.type) {
    case 'STORE_EXPENSE_EDIT_ID':
      return action.payload;
    default:
      return state;
  }
}

export function editRatesReducer(state = {}, action: AnyAction) {
  switch (action.type) {
    case 'STORE_EXPENSE_EDIT_RATES':
      return action.payload;
    default:
      return state;
  }
}

const wallet = combineReducers({
  currencies: currenciesReducer,
  expenses: expensesReducer,
  totalExpenses: convertedExpensesReducer,
  editor: editFormBoolReducer,
  idToEdit: storeEditIdReducer,
  editingRates: editRatesReducer,
});

export default wallet;
