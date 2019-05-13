import { combineReducers, createStore } from 'redux';

import counter from './modules/counter';

const rootReducer = combineReducers({
  counter,
});

let store = createStore(rootReducer);

store.subscribe(() => console.log(store.getState()));

export default store;
