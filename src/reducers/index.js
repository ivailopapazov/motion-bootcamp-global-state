import todos from './todosReducer';
import user from './userReducer';

const rootReducer = combineReducers({
    user,
    todos,
});

export default rootReducer;
