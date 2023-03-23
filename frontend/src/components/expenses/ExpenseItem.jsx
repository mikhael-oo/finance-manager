import {React} from 'react';

const ExpenseItem = (props) => {

    return (
        <li>
            Expense: {props.name} Amount: {props.amount}
        </li>
    );
};


export default ExpenseItem;