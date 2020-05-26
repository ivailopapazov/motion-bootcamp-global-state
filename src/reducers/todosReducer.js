const initialState = [
    { _id: 1, name: 'Shopping', isChecked: false },
    { _id: 2, name: 'Cleaning', isChecked: true },
    { _id: 3, name: 'Shopping1', isChecked: false },
    { _id: 4, name: 'Cleaning1', isChecked: true },
];

// Quick fix, it will be handled by the back end
let counter = 5;

const todo = (state, action) => {
    if (action.payload?._id && state._id !== action.payload._id) {
        return state;
    }

    switch (action.type) {
        case 'TODO_ADD':
            return {_id: counter++, name: action.payload, isChecked: false};
        case 'TODO_TOGGLE':
            return {...state, isChecked: !state.isChecked};
        case 'TODO_CHECK_ALL':
            return {...state, isChecked: true}
        default:
            return state;
    }
};

const todos = (state = initialState, action) => {
    switch (action.type) {
        case 'TODO_ADD':
            return [...state, todo(undefined, action)];
        case 'TODO_TOGGLE':
        case 'TODO_CHECK_ALL':
            return state.map(x => todo(x, action));
        default:
            return state;
    }
};

export default todos;