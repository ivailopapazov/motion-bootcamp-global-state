import { combineReducers } from  '../utils/dedux';
import todos from './todosReducer';
import user, * as fromUser from './userReducer';

const rootReducer = combineReducers({
    user,
    todos,
});

export default rootReducer;

export const getTodos = state => state.todos;
export const getUsername = state => fromUser.getUsername(state.user);
