import {
  GET_CUSTOMERS_PENDING,
  GET_CUSTOMERS_FULFILLED,
  GET_CUSTOMERS_REJECTED,
} from '../config/constants';

const initialState = {
  data: [],
  isLoading: false,

  errorMessage: '',
};

const customers = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_PENDING:
      return {...state, isLoading: action.payload};
    case GET_CUSTOMERS_FULFILLED:
      return {...state, data: action.payload, isLoading: action.loading};
    case GET_CUSTOMERS_REJECTED:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: action.loading,
      };

    default:
      return state;
  }
};

export default customers;
