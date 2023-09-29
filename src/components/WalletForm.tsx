import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootStateType, Dispatch } from '../redux/types';
import {
  editFormBoolAction,
  fetchCurrenciesAction,
  fetchExchangeRatesAction,
  overwriteExpenseAction } from '../redux/actions';

function WalletForm() {
  const dispatch: Dispatch = useDispatch();

  const {
    currencies,
    editor,
    idToEdit,
    editingRates } = useSelector((state: RootStateType) => state.wallet);

  const initialTag = 'Alimentação'; // Lint implicou...

  const [form, setForm] = useState({
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: initialTag,
    description: '',
    exchangeRates: {},
    id: 0,
  });

  const [editForm, setEditForm] = useState({
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: initialTag,
    description: '',
    exchangeRates: {},
    id: 0,
  });

  let { value, currency, description, method, tag } = form;

  if (editor) {
    value = editForm.value;
    currency = editForm.currency;
    method = editForm.method;
    tag = editForm.tag;
    description = editForm.description;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name } = event.target;
    const eventValue = event.target.value;
    if (editor) {
      setEditForm({
        ...editForm,
        [name]: eventValue,
      });
    } else {
      setForm({
        ...form,
        [name]: eventValue,
      });
    }
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    dispatch(fetchExchangeRatesAction(form));
    setForm({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: initialTag,
      description: '',
      exchangeRates: {},
      id: form.id + 1,
    });
  }

  function handleEditSubmit(event: any) {
    event.preventDefault();
    dispatch(overwriteExpenseAction(editForm, editingRates));

    dispatch(editFormBoolAction(false));
  }

  useEffect(() => {
    async function getCurrencies() {
      await dispatch(fetchCurrenciesAction());
    }

    getCurrencies();
  }, [dispatch, idToEdit]);

  return (
    <form>
      <input
        name="value"
        type="number"
        value={ value }
        onChange={ handleChange }
        placeholder="Valor da despesa"
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
      {editor
        ? (<button onClick={ handleEditSubmit }>Editar despesa</button>)
        : (<button onClick={ handleSubmit }>Adicionar despesa</button>)}
    </form>

  );
}

export default WalletForm;
