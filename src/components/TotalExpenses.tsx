import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType, Dispatch } from '../redux/types';
import { storeConvertedExpenseAction } from '../redux/actions';

function TotalExpenses() {
  const dispatch: Dispatch = useDispatch();
  const { expenses, totalExpenses } = useSelector((state: RootStateType) => state.wallet);
  const reducedExpenses = totalExpenses.reduce((acc, curr) => { return acc + curr; }, 0);

  useEffect(() => {
    function convertLastExpense() {
      const lastExpense = expenses[expenses.length - 1];
      if (lastExpense !== undefined) {
        const { ask } = lastExpense.exchangeRates[lastExpense.currency];
        const convertedAmount = ask * lastExpense.value;
        dispatch(storeConvertedExpenseAction(convertedAmount));
      }
    }
    convertLastExpense();
  }, [expenses, dispatch]);
  return (
    <p data-testid="total-field">
      { ((reducedExpenses * 100) / 100).toFixed(2) }
    </p>
  );
}

export default TotalExpenses;
