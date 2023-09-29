import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { vi } from 'vitest';
import * as APIModule from './currencyAPI/currencyAPI';
import mockData from './tests/helpers/mockData';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';

import { editFormBoolReducer, storeEditIdReducer } from './redux/reducers/wallet';

import App from './App';

const initialState = {
  user: { email: 'felipe@trybe.com' },
  wallet: {
    expenses: [{
      id: 0,
      value: '',
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {
        USD: {
          name: 'Dólar Americano/Real Brasileiro',
          ask: '5.0361',
        },
        EUR: {
          name: 'Euro/Real Brasileiro',
          ask: '5.3451',
        },
      },
    }],
    totalExpenses: [{
      amount: 5.0361, id: 0,
    },
    {
      amount: 0, id: 1,
    }],
    editor: false,
    idToEdit: 0,
    editingRates: {},
  },
};

beforeEach(() => {
  vi.spyOn(APIModule, 'getCurrenciesFromAPI').mockResolvedValue(mockData);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Teste da página de login', () => {
  it('Há dois inputs (login e senha), o botão é disponibilizado após validação e redireciona para a carteira', async () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const user = userEvent.setup();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: 'Entrar' });
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    const userEmail = 'usuario@gmail.com';

    await user.type(emailInput, userEmail);
    await user.type(passwordInput, '123456');
    expect(submitBtn).not.toBeDisabled();

    await act(async () => {
      await user.click(submitBtn);
    });

    expect(APIModule.getCurrenciesFromAPI).toHaveBeenCalled();
    expect(store.getState().user.email).toMatch(userEmail);

    const header = await screen.findByTestId('header-currency-field');
    expect(header).toBeInTheDocument();

    const headerEmail = screen.getByTestId('email-field');
    expect(headerEmail).toHaveTextContent(userEmail);
  });
});

describe('Testes da página carteira', () => {
  it('Há um formulário para preencher com as informações de uma despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    expect(APIModule.getCurrenciesFromAPI).toHaveBeenCalled();

    const valueInput = screen.getByTestId('value-input');
    const currencyInput = screen.getByTestId('currency-input');
    const descriptionInput = screen.getByTestId('description-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    expect(valueInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });

  it('Uma despesa pode ser adicionada na tabela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const user = userEvent.setup();

    const valueInput = screen.getByTestId('value-input');
    const currencyInput = screen.getByTestId('currency-input');
    const descriptionInput = screen.getByTestId('description-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    const addBtn = screen.getByRole('button', { name: 'Adicionar despesa' });

    await user.type(valueInput, '10');
    await user.selectOptions(currencyInput, 'EUR');
    await user.type(descriptionInput, 'Nova despesa');
    await user.selectOptions(methodInput, 'Cartão de crédito');
    await user.selectOptions(tagInput, 'Saúde');

    await user.click(addBtn);

    const table = screen.getByRole('table');
    const tableRow = screen.getAllByRole('row');
    const tableHeading = screen.getAllByRole('columnheader');

    const deleteBtn = screen.getAllByTestId('delete-btn')[1];
    const editBtn = screen.getAllByTestId('edit-btn')[1];
    expect(deleteBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();

    expect(table).toBeInTheDocument();
    expect(tableRow).toHaveLength(3);
    expect(tableHeading).toHaveLength(9);
  });

  it('Uma despesa do estado global é exibida corretamente na tabela, podendo excluir e editar', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const user = userEvent.setup();

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toHaveTextContent('5.04');

    const addBtn = screen.getByRole('button', { name: 'Adicionar despesa' });
    const deleteBtn = screen.getByTestId('delete-btn');
    const editBtn = screen.getByTestId('edit-btn');
    expect(addBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();

    await user.click(editBtn);
    expect(store.getState().wallet.editor).toBe(true);
    expect(store.getState().wallet.idToEdit).toEqual(0);

    const editingAction = {
      type: 'EDITING_EXPENSE',
      payload: true,
    };

    const editingIdAction = {
      type: 'STORE_EXPENSE_EDIT_ID',
      payload: 1,
    };

    expect(editFormBoolReducer(false, editingAction)).toBe(true);
    expect(storeEditIdReducer(0, editingIdAction)).toBe(1);

    const valueEditInput = screen.getByPlaceholderText('Valor da despesa');
    await user.type(valueEditInput, '2');
    const submitEditBtn = screen.getByRole('button', { name: 'Editar despesa' });

    expect(submitEditBtn).toBeInTheDocument();
    await user.click(submitEditBtn);

    expect(totalField).toHaveTextContent('10.07');

    expect(addBtn).toBeInTheDocument();

    await user.click(deleteBtn);
  });
});
