import {React, useContext, useEffect, useState} from 'react'
import { AppContext } from '../../context/AppContext'
import AuthContext from '../login/AuthContext';
import axios from 'axios';

const AddExpense = (props) => {
    // const { dispatch } = useContext(AppContext);
    const authContext = useContext(AuthContext);

    const [expenseName, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCat] = useState('');

    const [expenseList, setExpenseList] = useState([]);
    // const [id, setId] = useState(0);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
            const response = await axios.get('http://localhost:3000/api/expense/'+ authContext.userId);
            console.log(response.data)
            var currMonth = new Date().getMonth();
            var tempList = response.data;
            tempList = tempList.filter(e => e.month === currMonth);
            setExpenseList(tempList)
            } catch (error) {
            console.error(error);
            }
        };

        fetchExpenses();
    }, []);


    const onSubmit = async (e) => {
        e.preventDefault();

        // console.log(category);

        try {
            const response = await axios.post('http://localhost:3000/api/expense/addexpense', {
                uid: authContext.userId,
                name: expenseName,
                amount: amount,
                category: category,
                date: (new Date()).getTime(),
                month: (new Date()).getMonth()
            });
            alert('Expense adding successfully');
            console.log(response.data.user);
        } catch (err) {
            console.error(err);
            alert('Error adding exepense');
        }

        // const expense = {
        //     // id: id,
        //     name: expenseName,
        //     amount: parseFloat(amount),
        //     category: category,
        //     date: (new Date()).getTime(),
        //     month: (new Date()).getMonth()
        // };

        // dispatch({
        //     type: 'ADD_EXPENSE',
        //     payload: expense,
        // });

        // setName('');
        // setAmount('');
        // setCat('');
        // setId(id + 1);

    };

    const onDelete = async (id) => {
        try {
            const del = await axios.delete('http://localhost:3000/api/expense/deleteexpense/'+ authContext.userId + '/' + id);
            var tempList = response.data;
            tempList = tempList.filter(e => e.id != id);
            setExpenseList(tempList)
        }
        catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' value={expenseName} onChange={(e) => setName(e.target.value)} required/>

                <label htmlFor='amount'>Amount</label>
                <input type='number' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} required/>

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
            <div>
        <table>
        <caption>Expenses</caption>
        {/* <p>User ID: {authContext.userId}</p> */}
        <thead>
            <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {expenseList.map((expense) => (
            <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{format(new Date(expense.date), "dd/M/yyyy")}</td>
                <td><button onClick={() => onDelete(expense.id)}>Remove Expense</button></td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
        </div>
    )
}

export default AddExpense;