const todo = (state, action) => {
    switch (action.type) {
        case 'TODO_ADD':
            return {_id: action.payload._id, name: action.payload.name, isChecked: false};
        case 'TODO_TOGGLE':
            return {...state, isChecked: !state.isChecked};
        case 'TODO_CHECK_ALL':
            return {...state, isChecked: true}
        default:
            return state;
    }
};

export default todo;