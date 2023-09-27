import { useDispatch, useSelector } from 'react-redux';
import { RootStateType, Dispatch, ExpenseType } from '../redux/types';
import {
  deleteExpenseAction,
  editFormBoolAction,
  storeEditIdAction,
  storeEditRatesAction } from '../redux/actions';
import { twoDecs } from '../aux/functions';

function Table() {
  const dispatch: Dispatch = useDispatch();
  const { expenses } = useSelector((state: RootStateType) => state.wallet);

  function editExpense(expense: ExpenseType) {
    dispatch(editFormBoolAction(true));
    dispatch(storeEditRatesAction(expense.exchangeRates));
    dispatch(storeEditIdAction(expense.id));
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => {
          const selectedRate = expense.exchangeRates[expense.currency];
          return (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ twoDecs(expense.value) }</td>
              <td>{ selectedRate.name }</td>
              <td>{ twoDecs(selectedRate.ask) }</td>
              <td>{ twoDecs(expense.value * selectedRate.ask) }</td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  onClick={ () => editExpense(expense) }
                >
                  Editar
                </button>
                <button
                  onClick={ () => dispatch(deleteExpenseAction(expense.id)) }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
