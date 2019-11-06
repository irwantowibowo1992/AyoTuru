import {createStore, combineReducers, applyMiddleware} from 'redux';
import {logger, thunk} from './middleware';

//import reducer from customer reducer
import customers from '../_reducers/customers';
import rooms from '../_reducers/rooms';

//global state
const reducers = combineReducers({
  customers,
  rooms,
});

const store = createStore(
  reducers,

  applyMiddleware(thunk, logger),
);

export default store;
