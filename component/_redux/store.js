import {createStore, combineReducers, applyMiddleware} from 'redux';
import {logger, thunk} from './middleware';

//import reducer from customer reducer
import customers from '../_reducers/customers';

//global state
const reducers = combineReducers({
  customers,
});

const store = createStore(
  reducers,

  applyMiddleware(thunk, logger),
);

export default store;
