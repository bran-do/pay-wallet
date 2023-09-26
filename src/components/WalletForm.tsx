import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootStateType, Dispatch } from '../redux/types';
import { fetchCurrenciesAction, fetchExchangeRatesAction } from '../redux/actions';

function WalletForm() {
  const dispatch: Dispatch = useDispatch();

  const { currencies } = useSelector((state: RootStateType) => state.wallet);

  const [form, setForm] = useState({
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: {},
    id: 0,
  });
  const { value, currency, description, method, tag } = form;

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name } = event.target;
    const eventValue = event.target.value;
    setForm({
      ...form,
      [name]: eventValue,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(fetchExchangeRatesAction(form));
    setForm({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
      id: form.id + 1,
    });
  }

  useEffect(() => {
    async function getCurrencies() {
      await dispatch(fetchCurrenciesAction());
    }

    getCurrencies();
  }, [dispatch]);

  return (
    <form onSubmit={ handleSubmit }>
      <input
        name="value"
        type="number"
        value={ value }
        onChange={ handleChange }
        placeholder="Valor da desepesa"
        data-testid="value-input"
      />

      <select
        name="currency"
        value={ currency }
        onChange={ handleChange }
        data-testid="currency-input"
      >
        { currencies.map((fetchedCurrency) => (
          <option
            value={ fetchedCurrency }
            key={ fetchedCurrency }
          >
            { fetchedCurrency }
          </option>
        ))}
      </select>

      <input
        name="description"
        type="text"
        value={ description }
        onChange={ handleChange }
        placeholder="Descrição da despesa"
        data-testid="description-input"
      />

      <select
        name="method"
        value={ method }
        onChange={ handleChange }
        data-testid="method-input"
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>

      <select
        name="tag"
        value={ tag }
        onChange={ handleChange }
        data-testid="tag-input"
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>

      <button type="submit">Adicionar despesa</button>
    </form>

  );
}

export default WalletForm;
