import {React, createContext, useReducer} from "react";

const initialState = {
    expenses: [],
    total: 0
}

export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            console.log("ADD_EXPENSE")
            console.log(action.payload)
            return {
                ...state,
                expenses: [action.payload, ...state.expenses],
                total: state.total + action.payload.amount
            }
        default:
            return state;
    }
}

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                total: state.total,
                dispatch,
            }}
            >
                {props.children}
        </AppContext.Provider>
    )
}