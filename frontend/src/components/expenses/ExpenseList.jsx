import {React, useContext, useEffect} from "react";
import {format} from "date-fns"
//import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import AuthContext from "../login/AuthContext";

const ExpenseList = () => {
    const { expenses, setExpenses } = useContext(AppContext);
    const authContext = useContext(AuthContext);

    useEffect(() => {
    const fetchExpenses = async () => {
        try {
        const response = await axios.get('http://localhost:3000/api/expense/list', {
            uid: parseInt(authContext.userId, 10)
        });
        console.log(response.data)
        //setExpenses(response.data);
        } catch (error) {
        console.error(error);
        }
    };

    fetchExpenses();
    }, [authContext.userId, setExpenses]);

    return (
    <div>
        <table>
        <caption>Expenses</caption>
        <p>User ID: {authContext.userId}</p>
        <thead>
            <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {expenses.map((expense) => (
            <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{format(new Date(expense.date), "dd/M/yyyy")}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
};


// const ExpenseList = (props) => {
    
//     const { expenses } = useContext(AppContext)
//     const authContext = useContext(AuthContext);
//     console.log(authContext);

//     return (
//         <div>
//             <table>
//                 <caption>Expenses</caption>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Amount</th>
//                         <th>Category</th>
//                         <th>Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {expenses.map((expense) =>
//                         <tr key={expense.date}>
//                             <td>{expense.name}</td>
//                             <td>{expense.amount}</td>
//                             <td>{expense.category}</td>
//                             <td>{format((new Date(expense.date)),"dd/M/yyyy")}</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

export default ExpenseList;