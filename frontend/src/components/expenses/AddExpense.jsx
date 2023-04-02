import {React, useContext, useState} from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios';

const AddExpense = (props) => {
    const { dispatch } = useContext(AppContext);

    const [expenseName, setName] = useState('');
    const [amount, setAmount] = useState('');
    // const [description, setDesc] = useState('');
    const [category, setCat] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log(category);

        // try {
        //     const response = await axios.post('http://localhost:3000/api/expense/addexpense', {
        //         name: expenseName,
        //         amount: amount,
        //         // description: description,
        //         category: category
        //     });
        //     alert('Expense adding successfully');
        //     console.log(response.data.user);
        //   } catch (err) {
        //     console.error(err);
        //     alert('Error adding exepense');
        //   }

        const expense = {
            // id: Math.floor(Math.random()*1000),
            name: expenseName,
            amount: parseFloat(amount),
            // description: description,
            category: category,
            date: (new Date()).getTime(),
            month: (new Date()).getMonth()
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense,
        });

        setName('');
        setAmount('');
        // setDesc('');
        setCat('');

    };
    
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' value={expenseName} onChange={(e) => setName(e.target.value)} required/>

            <label htmlFor='amount'>Amount</label>
            <input type='number' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} required/>

            {/* <label htmlFor='description'>Description</label>
            <input type='text' id='description' value={description} onChange={(e) => setDesc(e.target.value)} required/> */}

            <label htmlFor='category'>Category</label>
            <select id='category' value={category} onChange={(e) => setCat(e.target.value)} required>
                <option value='category'>Select Category</option>
                <option value='housing'>Housing</option>
                <option value='utilities'>Utilities</option>
                <option value='transportation'>Transportation</option>
                <option value='food'>Food</option>
                <option value='entertainment'>Entertainment</option>
                <option value='saving'>Saving</option>
                <option value='miscellaneous'>Miscellaneous</option>
            </select>
            <button type='submit'>Add</button>
        </form>
    )
}

export default AddExpense;