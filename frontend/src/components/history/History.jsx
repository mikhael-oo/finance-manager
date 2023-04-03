import  { useState, useEffect } from 'react';
import axios from 'axios';

const UserExpensesTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/api/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExpenses();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredExpenses = expenses.filter((expense) =>
    selectedMonth ? expense.month === selectedMonth : true
  );

  return (
    <div className="flex flex-col">
      <div className="flex justify-center my-4">
        <label htmlFor="month" className="mr-2">
          Filter by month:
        </label>
        <select
          id="month"
          className="px-2 py-1 border rounded"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="">All</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <table className="table-auto border w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-4 py-2 border">{expense.date}</td>
              <td className="px-4 py-2 border">{expense.description}</td>
              <td className="px-4 py-2 border">{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserExpensesTable;
