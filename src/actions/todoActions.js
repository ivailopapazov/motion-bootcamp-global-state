import {
    TODO_ADD,
} from './actionTypes';

// Simple action creator
const addTodoSuccess = data => ({
    type: TODO_ADD,
    payload: data
});

export const addTodo = name => dispatch => {
    console.log(dispatch);
    
    let newTodo = {_id: Date.now(), name}
    
    dispatch(addTodoSuccess(newTodo));
};

export const toggleTodo = todo => {
    return {type: 'TODO_TOGGLE', payload: todo};
};

export const setFilter = filter => {
    return {type: 'TODOS_FILTER_SET', payload: filter};
};
