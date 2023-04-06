import {React, useContext, useEffect, useState} from 'react'
import AuthContext from '../login/AuthContext';
import axios from 'axios';
import { format } from 'date-fns'

const AddExpense = (props) => {
    const authContext = useContext(AuthContext);

    const [expenseName, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCat] = useState('');

    const [expenseList, setExpenseList] = useState([]);

    const fetchExpenses = async () => {
        try {
        const response = await axios.get('http://localhost:3000/api/expense/'+ authContext.userId);
        var currMonth = new Date().getMonth();
        var tempList = []
        tempList = response.data
        tempList = tempList.filter(e => e.month === currMonth);
        tempList = Array.from(response.data)
        tempList = tempList.filter(e => e.month === currMonth)

        setExpenseList(tempList)
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);


    const onSubmit = async (e) => {
        e.preventDefault();

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
            fetchExpenses();
        } catch (err) {
            console.error(err);
            alert('Error adding exepense');
        }

        setName('');
        setAmount('');
        setCat('');

    };

    const onDelete = async (id) => {
        try {
            const response = await axios.delete('http://localhost:3000/api/expense/deleteexpense/'+ authContext.userId + '/' + id);
            fetchExpenses();
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form className='flex space-x-2' onSubmit={onSubmit}>
                <label className='font-semibold' htmlFor='name'>Name: </label>
                <input className="border-2 border-black rounded-md text-black px-2" type='text' id='name' value={expenseName} onChange={(e) => setName(e.target.value)} required/>

                <label className='font-semibold' htmlFor='amount'>Amount: </label>
                <input className="border-2 border-black rounded-md text-black px-2" type='number' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} required/>

                <label className='font-semibold' htmlFor='category'>Category: </label>
                <select className="border-2 border-black rounded-md text-black px-2" id='category' value={category} onChange={(e) => setCat(e.target.value)} required>
                    <option value='category'>Select Category</option>
                    <option value='housing'>Housing</option>
                    <option value='utilities'>Utilities</option>
                    <option value='transportation'>Transportation</option>
                    <option value='food'>Food</option>
                    <option value='entertainment'>Entertainment</option>
                    <option value='saving'>Saving</option>
                    <option value='miscellaneous'>Miscellaneous</option>
                </select>
                <button className="border-2 rounded-md bg-blue-600 text-white px-4" type='submit'>Add Expense</button>
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
                <td>{expense.title}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{format(new Date(parseInt(expense.date)), "dd/M/yyyy")}</td>
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