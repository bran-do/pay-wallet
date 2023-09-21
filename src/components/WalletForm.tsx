function WalletForm() {
  return (
    <form>
      <input
        type="number"
        placeholder="Valor da desepesa"
        data-testid="value-input"
      />

      <input
        type="text"
        placeholder="Descrição da despesa"
        data-testid="description-input"
      />

      <select name="method" data-testid="method-input">
        <option value="money">Dinheiro</option>
        <option value="credit-card">Cartão de crédito</option>
        <option value="debit-card">Cartão de débito</option>
      </select>

      <select name="tag" data-testid="tag-input">
        <option value="food">Alimentação</option>
        <option value="leisure">Lazer</option>
        <option value="work">Trabalho</option>
        <option value="transportation">Transporte</option>
        <option value="health">Saúde</option>
      </select>
    </form>
  );
}

export default WalletForm;
