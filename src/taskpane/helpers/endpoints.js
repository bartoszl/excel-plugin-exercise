import { getRequest } from './request';

// This would be normally imported from process.env, just here for simplicity
const EXCHANGE_API_URL = 'https://api.exchangeratesapi.io';

export const getExchangeRates = getRequest(`${EXCHANGE_API_URL}/latest`);
export const getCurrencyList = getRequest('https://openexchangerates.org/api/currencies.json')
