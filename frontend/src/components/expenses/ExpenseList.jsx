import {React, useContext} from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";

const ExpenseList = (props) => {
    
    const { expenses } = useContext(AppContext)

    return (
        <div>
            <h3>Expense History</h3>
            <ul>
                {expenses.map((expense) => (<ExpenseItem key={expense.id} name={expense.name} amount={expense.amount} />))}
            </ul>
        </div>
    )
}

export default ExpenseList;