import { createStore } from './dedux';
import todosReducer from '../reducers/todosReducer';

const store = createStore(todosReducer);

// Logger
store.subscribe(state => {
    console.log('State Changed:');
    console.log(state);
})

export default store;