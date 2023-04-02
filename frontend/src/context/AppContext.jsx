import {React, createContext, useReducer} from "react";

const initialState = {
    expenses: [],
    total: 0,
    budget: [],
    // remaining: 0
}

export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [action.payload, ...state.expenses],
                total: state.total + action.payload.amount,
                // remaining: state.remaining - action.payload.amount
            }
        case 'ADD_BUDGET':
            console.log(action.payload.budget)
            return {
                ...state,
                budget: action.payload.budget,
                // remaining: action.payload.budget
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
                budget: state.budget,
                // remaining: state.remaining,
                dispatch,
            }}
            >
                {props.children}
        </AppContext.Provider>
    )
}