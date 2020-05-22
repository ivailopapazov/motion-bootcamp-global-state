const createStore = reducer => {
    let state;
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

export {
    createStore
};