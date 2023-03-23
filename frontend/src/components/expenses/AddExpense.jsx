import {React, useContext, useState} from 'react'
import { AppContext } from '../../context/AppContext'

const AddExpense = (props) => {
    const { dispatch } = useContext(AppContext);

    const [expenseName, setName] = useState('');
    const [amount, setAmount] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const expense = {
            id: Math.floor(Math.random()*1000),
            name: expenseName,
            amount: parseFloat(amount),
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense,
        });

        setName('');
        setAmount('');
    }
    
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' value={expenseName} onChange={(e) => setName(e.target.value)}/>
            <label htmlFor='amount'>Amount</label>
            <input type='number' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)}/>
            <button type='submit'>Add</button>
        </form>
    )
}

export default AddExpense;