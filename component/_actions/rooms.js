import {
  GET_ROOMS_PENDING,
  GET_ROOMS_FULFILLED,
  GET_ROOMS_REJECTED,
} from '../config/constants';

import {API} from '../config/api';

const getRoomsP = isLoading => {
  return {
    type: GET_ROOMS_PENDING,
    payload: isLoading,
  };
};

const getRoomsF = data => {
  //Return a action type and a loading to false, and the data.
  return {
    type: GET_ROOMS_FULFILLED,
    payload: data,
    loading: false,
  };
};

const getRoomsR = error => {
  //Return a action type and a payload with a error
  return {
    type: GET_ROOMS_REJECTED,
    payload: error,
    loading: false,
  };
};

export const getRooms = () => {
  return dispatch => {
    dispatch(getRoomsP(true));
    API.get(`/rooms`)
      .then(res => {
        dispatch(getRoomsF(res.data));
      })
      .catch(err => dispatch(getRoomsR(err.message)));
  };
};
