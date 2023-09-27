import { useSelector } from 'react-redux';
import { RootStateType } from '../redux/types';
import TotalExpenses from './TotalExpenses';

function Header() {
  const { email } = useSelector((state: RootStateType) => state.user);

  return (
    <div>
      <h3 data-testid="email-field">{ email }</h3>
      <TotalExpenses />
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}

export default Header;
