import { createStore, combineReducers } from './dedux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

// Logger
store.subscribe(state => {
    console.log('State Changed:');
    console.log(state);
})

export default store;