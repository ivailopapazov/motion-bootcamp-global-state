const initialState = {
    username: ''
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_NAME_SET':
            return {...state, username: action.payload};
        default:
            return state;
    }
};

export default user;

export const getUsername = state => state.username;
