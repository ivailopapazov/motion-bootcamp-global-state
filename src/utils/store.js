import { createStore, combineReducers } from './dedux';
import todosReducer from '../reducers/todosReducer';
import userReducer from '../reducers/userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    todos: todosReducer,
});

const store = createStore(rootReducer);

// Logger
store.subscribe(state => {
    console.log('State Changed:');
    console.log(state);
})

export default store;