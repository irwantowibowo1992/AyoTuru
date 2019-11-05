import {
  GET_CUSTOMERS_PENDING,
  GET_CUSTOMERS_FULFILLED,
  GET_CUSTOMERS_REJECTED,
} from '../config/constants';

import {API} from '../config/api';

const getCustomersP = isLoading => {
  return {
    type: GET_CUSTOMERS_PENDING,
    payload: isLoading,
  };
};

const getCustomersF = data => {
  //Return a action type and a loading to false, and the data.
  return {
    type: GET_CUSTOMERS_FULFILLED,
    payload: data,
    loading: false,
  };
};

const getCustomersR = error => {
  //Return a action type and a payload with a error
  return {
    type: GET_CUSTOMERS_REJECTED,
    payload: error,
    loading: false,
  };
};

export const getCustomers = () => {
  return dispatch => {
    dispatch(getCustomersP(true));
    API.get(`/customers`)
      .then(res => {
        dispatch(getCustomersF(res.data));
      })
      .catch(err => dispatch(getCustomersR(err.message)));
  };
};
