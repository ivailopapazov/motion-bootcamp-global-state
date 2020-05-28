import { createStore, applyMiddleware } from './dedux';
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

const addPromiseSupportToDispatch = store => dispatch => action => {
    if (typeof(action.then) === 'function') {
        return action.then(res => dispatch(res));
    }

    return dispatch(action);
};

const addThunkSupportToDispatch = store => dispatch => action => {
    if (typeof(action) === 'function') {
        return action(dispatch);
    }

    return dispatch(action);
};

let enhancer = applyMiddleware(addThunkSupportToDispatch, addPromiseSupportToDispatch)

const store = createStore(rootReducer, loadState(), enhancer);

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