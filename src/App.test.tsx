import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './tests/helpers/mockData';
import * as APIModule from './currencyAPI/currencyAPI';

import { renderWithRouterAndRedux } from './tests/helpers/renderWith';

import App from './App';
import Wallet from './pages/Wallet';

describe('Teste da página de login', () => {
  it('Há dois inputs (login e senha), o botão é disponibilizado após validação e redireciona para a carteira', async () => {
    renderWithRouterAndRedux(<App />);
    const user = userEvent.setup();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: 'Entrar' });
    expect(submitBtn).toBeDisabled();

    const userEmail = 'usuario@gmail.com';

    await user.type(emailInput, userEmail);
    await user.type(passwordInput, '123456');
    expect(submitBtn).not.toBeDisabled();

    await user.click(submitBtn);

    const header = screen.getByTestId('header-currency-field');
    expect(header).toBeInTheDocument();

    const headerEmail = screen.getByTestId('email-field');
    expect(headerEmail).toHaveTextContent(userEmail);
  });
});

describe('Testes da página carteira', () => {
  it('Há um formulário para preencher com as informações de uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);

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

  it('Há uma tabela com informações sobre as despesas', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const table = screen.getByRole('table');
    const tableHeading = screen.getAllByRole('columnheader');

    expect(table).toBeInTheDocument();
    expect(tableHeading).toHaveLength(9);
  });

  it('Uma despesa é adicionada e exibida corretamente na tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const user = userEvent.setup();

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');

    const addBtn = screen.getByRole('button', { name: 'Adicionar despesa' });

    await user.type(valueInput, '10');
    await user.type(descriptionInput, 'Nova despesa');

    await user.click(addBtn);
  });
});

// beforeEach(() => {
//   vi.spyOn(APIModule, 'currencyAPI').mockResolvedValue(mockData);
// });

// afterEach(() => {
//   vi.restoreAllMocks();
// });

// test('A página de login possui dois inputs válidos para login e senha e a carteira é exibida ao logar', async () => {
//   renderWithRouterAndRedux(<App />);
//   const user = userEvent.setup();

//   const loginInput = screen.getByPlaceholderText('E-mail');
//   const passwordInput = screen.getByPlaceholderText('Senha');
//   const submitBtn = screen.getByRole('button', { name: 'Entrar' });

//   await user.type(loginInput, 'usuario@gmail.com');
//   await user.type(passwordInput, '123456');
//   await user.click(submitBtn);

//   const header = screen.getByTestId('header-currency-field');

//   await waitFor(() => {
//     expect(header).toBeInTheDocument();
//   })
// })
