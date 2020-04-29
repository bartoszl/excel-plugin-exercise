import {
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_FAILURE,
} from '../actionTypes/currencies';

const initialState = {
  isFetching: false,
  records: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENCIES:
      return {
        ...state,
        isFetching: true,
        records: [],
        error: null,
      };
    case GET_CURRENCIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        records: action.records,
        error: null,
      };
    case GET_CURRENCIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        records: [],
        error: action.error,
      };
    default:
      return state;
  }
};
