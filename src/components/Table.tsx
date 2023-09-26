import { useSelector } from 'react-redux';
import { RootStateType } from '../redux/types';

function Table() {
  const { expenses, totalExpenses } = useSelector((state: RootStateType) => state.wallet);

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
        {expenses.map((expense, key) => {
          const rates = expense.exchangeRates;
          return (
            <tr key={ key }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{((expense.value * 100) / 100).toFixed(2)}</td>
              <td>{rates[expense.currency].name}</td>
              <td>{((rates[expense.currency].ask * 100) / 100).toFixed(2)}</td>
              <td>{((totalExpenses[expense.id] * 100) / 100).toFixed(2)}</td>
              <td>Real</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
