import {
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_FAILURE,
} from '../actionTypes/currencies';
import { getCurrencyList } from '../helpers/endpoints';

const requestCurrencies = () => ({
  type: GET_CURRENCIES,
});

const requestCurrenciesSuccess = (records) => ({
  type: GET_CURRENCIES_SUCCESS,
  records,
});

const requestCurrenciesFailure = (error) => ({
  type: GET_CURRENCIES_SUCCESS,
  error,
});

export const getCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestCurrencies());

    const { data } = await getCurrencyList();

    dispatch(requestCurrenciesSuccess(Object.keys(data)));
  } catch(err) {
    dispatch(requestCurrenciesFailure(err));
  }
};
