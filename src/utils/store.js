import { createStore, combineReducers } from './dedux';
import rootReducer from '../reducers';

const saveState = state => {
    let serializedState = JSON.stringify(state);

    localStorage.setItem('state', serializedState);
};

const loadState = () => {
    let serializedState = localStorage.getItem('state');

    if (serializedState) {
        return JSON.parse(serializedState);
    }
}; 

const store = createStore(rootReducer, loadState());

store.subscribe(state => {
    // TODO: Add throttle
    saveState(state);
});

// Logger
store.subscribe(state => {
    console.log('State Changed:');
    console.log(state);
});

export default store;