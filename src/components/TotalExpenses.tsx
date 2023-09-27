import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../redux/types';
import { twoDecs } from '../aux/functions';

function TotalExpenses() {
  const { totalExpenses } = useSelector((state: RootStateType) => state.wallet);

  const [currentAmount, setCurrentAmount] = useState(String);

  useEffect(() => {
    function getTotal() {
      const totalAmount: any = [0];
      totalExpenses.map((expense: any) => totalAmount.push(expense.amount));

      setCurrentAmount(
        twoDecs(
          totalAmount
            .reduce((acc: number, curr: number) => acc + curr),
        ),
      );
    }

    getTotal();
  }, [totalExpenses]);
  return (
    <p data-testid="total-field">
      { currentAmount }
    </p>
  );
}

export default TotalExpenses;
