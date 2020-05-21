import React, { createContext, useContext } from 'react';

const createStore = reducer => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        console.log(state);
        
        listeners.forEach(l => l(state));
    };

    const subscribe = listener => {
        listeners.push(listener);

        return () => listeners.filter(x => x != listener);
    };

    dispatch({});

    return { getState, dispatch, subscribe };
};

const DeduxContext = createContext();

const useDeduxContext = () => useContext(DeduxContext);

const DeduxProvider = ({
    store,
    children,
}) => {
    return (
        <DeduxContext.Provider value={store}>
            {children}
        </DeduxContext.Provider>
    );
};

export {
    createStore,
    DeduxProvider,
    useDeduxContext,
};