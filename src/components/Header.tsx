import { useSelector } from "react-redux";
import { RootStateType } from "../redux/types";

function Header() {
  const userEmail = useSelector((state: RootStateType) => state.user);
  return (
    <div>
      <h3 data-testid="email-field">{ userEmail.email }</h3>
      <p data-testid="total-field">0</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}

export default Header;
