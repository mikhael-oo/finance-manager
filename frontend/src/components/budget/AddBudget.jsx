import {React, useContext, useState} from "react";
import { AppContext } from '../../context/AppContext'

const AddBudget = (props) => {
    const {dispatch} = useContext(AppContext);

    const [newBudget, setBudget] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const budget = {
            budget: parseFloat(newBudget),
        };

        dispatch({
            type: 'ADD_BUDGET',
            payload: budget,
        });

        setBudget('');
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="budget">Budget</label>
            <input type='number' id='budget' value={newBudget} onChange={(e) => setBudget(e.target.value)}/>
            <button type="submit">Set Budget</button>
        </form>
    )
}

export default AddBudget;