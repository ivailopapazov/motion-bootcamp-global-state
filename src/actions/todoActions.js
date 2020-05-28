import {
    TODO_ADD,
} from './actionTypes';

// Simple action creator
const addTodoSuccess = data => ({
    type: TODO_ADD,
    payload: data
});

export const addTodo = name => {
    let newTodo = {_id: Date.now(), name}
    
    return addTodoSuccess(newTodo);
};

export const toggleTodo = todo => {
    return {type: 'TODO_TOGGLE', payload: todo};
};

export const setFilter = filter => {
    return {type: 'TODOS_FILTER_SET', payload: filter};
};
