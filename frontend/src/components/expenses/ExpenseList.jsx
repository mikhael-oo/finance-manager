import {React, useContext} from "react";
import {format} from "date-fns"
// import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";

const ExpenseList = (props) => {
    
    const { expenses } = useContext(AppContext)

    return (
        <div>
            <table>
                <caption>Expenses</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) =>
                        <tr key={expense.date}>
                            <td>{expense.name}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.category}</td>
                            <td>{format((new Date(expense.date)),"dd/M/yyyy")}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ExpenseList;