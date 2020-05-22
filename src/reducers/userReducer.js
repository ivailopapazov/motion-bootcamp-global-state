const initialState = {
    name: ''
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_NAME_SET':
            return {...state, name: action.payload};
        default:
            return state;
    }
}

export default user;