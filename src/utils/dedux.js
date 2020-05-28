const createStore = (reducer, preloadedState, enhancer) => {
    let state = preloadedState;
    let listeners = [];

    const getState = () => state;

    let dispatch = action => {
        state = reducer(state, action);
        
        listeners.forEach(l => l(state));
    };

    const subscribe = listener => {
        listeners.push(listener);

        return () => listeners.filter(x => x != listener);
    };

    const store = { getState, dispatch, subscribe };

    if (enhancer) {
        store.dispatch = enhancer(store, dispatch);
    }

    store.dispatch({});

    return store;
};

const combineReducers = reducers => (state = {}, action) => {
    return Object.keys(reducers)
        .reduce((newState, x) => {
            newState[x] = reducers[x](state[x], action);

            return newState;
        }, {});
};

const applyMiddleware = (...middlewares) => (store, dispatch) => {
    return middlewares.reduce((dispatch, middleware) => {
        return middleware(store)(dispatch)
    }, dispatch);
};

export {
    createStore,
    combineReducers,
    applyMiddleware,
};