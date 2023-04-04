import ExpenseList from '../expenses/ExpenseList'
import AddExpense from '../expenses/AddExpense';
import TotalSpent from '../expenses/TotalSpent';

export const Expense = () => {
    return (
        <div>
            <p>Expense</p>
            {/* <TotalSpent /> */}
            <AddExpense />
            {/* <ExpenseList /> */}
        </div>
    );
};

export default Expense;

