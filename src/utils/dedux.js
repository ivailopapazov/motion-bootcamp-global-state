const createStore = (reducer, preloadedState) => {
    let state = preloadedState;
    let listeners = [];

    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        
        listeners.forEach(l => l(state));
    };

    const subscribe = listener => {
        listeners.push(listener);

        return () => listeners.filter(x => x != listener);
    };

    dispatch({});

    return { getState, dispatch, subscribe };
};

const combineReducers = reducers => (state = {}, action) => {
    return Object.keys(reducers)
        .reduce((newState, x) => {
            newState[x] = reducers[x](state[x], action);

            return newState;
        }, {});
};

export {
    createStore,
    combineReducers,
};