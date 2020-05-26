import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

const useDeduxContext = () => useContext(Context);

const Provider = ({
    store,
    children,
}) => {
    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    );
};

const addPromiseSupportToDispatch = dispatch => input => {
    if (typeof(input.then) === 'function') {
        return input.then(res => dispatch(res));
    }

    return dispatch(input);
};

const addThunkSupportToDispatch = dispatch => input => {
    if (typeof(input) === 'function') {
        return input(dispatch);
    }

    return dispatch(input);
};

const connect = (mapState, mapProps) => Component => props => {
    let { getState, dispatch, subscribe } = useDeduxContext();
    let [oldState, setState] = useState();

    // Todo: need some optimization
    subscribe(newState => {
        if (newState) {
            setState(newState);
        }
    });

    let dispatchWithPromise = addPromiseSupportToDispatch(dispatch);
    let dispatchWithPromiseAndThunkSupport = addThunkSupportToDispatch(dispatchWithPromise);

    let propActions = {};

    let mappedProps = mapState ? mapState(getState()) : {};

    if (typeof(mapProps) === 'function') {
        propActions = mapProps(dispatchWithPromiseAndThunkSupport);
    } else { 
        propActions = Object.keys(mapProps).reduce((a, x) => {
            a[x] = data => dispatchWithPromiseAndThunkSupport(mapProps[x](data));

            return a;
        }, {});
    }

    return <Component {...props} {...mappedProps} {...propActions} />
};

export {
    connect,
    Provider,
    useDeduxContext,
};
