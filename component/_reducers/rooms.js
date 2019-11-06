import {
  GET_ROOMS_PENDING,
  GET_ROOMS_FULFILLED,
  GET_ROOMS_REJECTED,
} from '../config/constants';

const initialState = {
  data: [],
  isLoading: false,

  errorMessage: '',
};

const rooms = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOMS_PENDING:
      return {...state, isLoading: action.payload};
    case GET_ROOMS_FULFILLED:
      return {...state, data: action.payload, isLoading: action.loading};
    case GET_ROOMS_REJECTED:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: action.loading,
      };

    default:
      return state;
  }
};

export default rooms;
