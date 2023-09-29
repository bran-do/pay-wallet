import { getCurrenciesFromAPI } from './currencyAPI';

test('Teste da API', async () => {
  const data = await getCurrenciesFromAPI();
  expect(data.EUR.code).toBe('EUR');
});
