import React, {createContext, useContext, useReducer }from 'react';

export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)} >
        {children}
    </StateContext.Provider>
);  // data layer ehich wraps my whole app.js

export const useStateValue=() => useContext(StateContext); // my own hook