import { combineReducers } from "../utils/dedux";
import todo from './todoReducer';
import mapValues from 'lodash/mapValues';
import {
    TODO_ADD,
} from '../actions/actionTypes';

const initialState = {
    1: { _id: 1, name: 'Shopping', isChecked: false },
    2: { _id: 2, name: 'Cleaning', isChecked: true },
    3: { _id: 3, name: 'Shopping1', isChecked: false },
    4: { _id: 4, name: 'Cleaning1', isChecked: true },
};

let initialAllIds = Object.keys(initialState);

const allIds = (state = initialAllIds, action) => {
    switch (action.type) {
        case TODO_ADD:
            return [...state, action.payload._id]
        default:
            return state;
    }
}

const byId = (state = initialState, action) => {
    let id = action?.payload?._id;
    
    switch (action.type) {
        case TODO_ADD:
        case 'TODO_TOGGLE':
            return {...state, [id]: todo(state[id], action)};
        case 'TODO_CHECK_ALL': 
            return mapValues(state, t => todo(t, action));
        default:
            return state;
    }
};

const filter = (state = 'all', action) => {
    switch (action.type) {
        case 'TODOS_FILTER_SET':
            return action.payload;
        default:
            return state;
    }
}

const todos = combineReducers({
    allIds,
    byId,
    filter,
});

export default todos;

const getFilteredTodos = (state, filter) => {
    switch (filter) {
        case 'finished':
            return state.filter(x => x.isChecked);
        case 'unfinished':
            return state.filter(x => !x.isChecked);
        default:
            return state;
    }
};

export const getTodos = (state) => {
    // Temporary solution
    let filter = state.filter

    let newState = state.allIds.map(x => state.byId[x]);

    return getFilteredTodos(newState, filter);
};
