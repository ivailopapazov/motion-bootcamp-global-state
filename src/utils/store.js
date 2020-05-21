
import { createStore } from './dedux';


const initialState = {
    todos: [
        {_id: 1, name: 'Shopping', isChecked: false},
        {_id: 2, name: 'Cleaning', isChecked: true},
        {_id: 3, name: 'Shopping1', isChecked: false},
        {_id: 4, name: 'Cleaning1', isChecked: true},
    ],
  };
  
  const reducer = (state = initialState, action) => {
      switch (action.type) {
        case 'TODO_ADD':
          return {...state, todos: [...state.todos, action.payload]};
        case 'TODO_TOGGLE':
            return {...state, todos: state.todos.map(t => t._id == action.payload._id ? {...t, isChecked: !t.isChecked} : t)}
        default:
          return state;
      }
  };
  
  const store = createStore(reducer);

  export default store;