import { combineReducers } from  '../utils/dedux';
import todos, * as fromTodos from './todosReducer';
import user, * as fromUser from './userReducer';

const rootReducer = combineReducers({
    user,
    todos,
});

export default rootReducer;

export const getUsername = state => fromUser.getUsername(state.user);

export const getTodos = (state, filter) => fromTodos.getTodos(state.todos, filter);