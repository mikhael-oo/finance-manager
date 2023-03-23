import {React, useContext, useState} from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios';

const AddExpense = (props) => {
    const { dispatch } = useContext(AppContext);

    const [expenseName, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDesc] = useState('');
    const [category, setCat] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/expense/addexpense', {
                name: expenseName,
                amount: amount,
                description: description,
                category: category
            });
            alert('Expense adding successfully');
            console.log(response.data.user);
          } catch (err) {
            console.error(err);
            alert('Error adding exepense');
          }

        const expense = {
            id: Math.floor(Math.random()*1000),
            name: expenseName,
            amount: parseFloat(amount),
            description: description,
            category: category
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense,
        });

        setName('');
        setAmount('');
        setDesc('');
        setCat('');

    };
    
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' value={expenseName} onChange={(e) => setName(e.target.value)}/>

            <label htmlFor='amount'>Amount</label>
            <input type='number' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)}/>

            <label htmlFor='description'>Description</label>
            <input type='text' id='description' value={description} onChange={(e) => setDesc(e.target.value)}/>

            <label htmlFor='category'>Category</label>
            <input type='text' id='category' value={category} onChange={(e) => setCat(e.target.value)}/>
            <button type='submit'>Add</button>
        </form>
    )
}

export default AddExpense;