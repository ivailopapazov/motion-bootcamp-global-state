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

const connect = (mapState, mapProps) => Component => props => {
    let { getState, dispatch, subscribe } = useDeduxContext();
    let [oldState, setState] = useState();

    // Todo: need some optimization
    subscribe(newState => {
        if (newState) {
            setState(newState);
        }
    });

    let propActions = {};

    let mappedProps = mapState ? mapState(getState(), props) : {};

    if (typeof(mapProps) === 'function') {
        propActions = mapProps(dispatch);
    } else { 
        propActions = Object.keys(mapProps).reduce((a, x) => {
            a[x] = data => dispatch(mapProps[x](data));

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
