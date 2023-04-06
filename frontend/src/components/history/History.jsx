import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../login/AuthContext';
import { format } from 'date-fns'
import axios from 'axios';

const UserExpensesTable = ({ userId }) => {
  const authContext = useContext(AuthContext);
  
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAmountRange, setSelectedAmountRange] = useState('');

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/expense/'+ authContext.userId);
      console.log(response.data)
      setExpenses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAmountRangeChange = (event) => {
    setSelectedAmountRange(event.target.value);
  };

  const filteredExpenses = expenses.filter((expense) =>
    (selectedMonth ? expense.month === parseInt(selectedMonth) : true) &&
    (selectedCategory ? expense.category === selectedCategory : true) &&
    (selectedAmountRange ? 
      (selectedAmountRange === 'low' ? expense.amount < 50 : expense.amount >= 50) : true)
  );

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1)
  }

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
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
        <label htmlFor="category" className="mx-2">
          Filter by category:
        </label>
        <select
          id="category"
          className="px-2 py-1 border rounded"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          <option value='housing'>Housing</option>
          <option value='utilities'>Utilities</option>
          <option value='transportation'>Transportation</option>
          <option value='food'>Food</option>
          <option value='entertainment'>Entertainment</option>
          <option value='saving'>Saving</option>
          <option value='miscellaneous'>Miscellaneous</option>

        </select>
        <label htmlFor="amount-range" className="mx-2">
          Filter by amount range:
        </label>
        <select
          id="amount-range"
          className="px-2 py-1 border rounded"
          value={selectedAmountRange}
          onChange={handleAmountRangeChange}
        >
          <option value="">All</option>
          <option value="low">Less than $50</option>
          <option value="high">$50 or more</option>
        </select>
        </div>
        <div className="flex justify-center">
            <table className="w-full border table-auto">
                <thead>
                <tr>
                    <th className="text-left px-4 py-2 border">#</th>
                    <th className="text-left px-4 py-2 border">Month</th>
                    <th className="text-left px-4 py-2 border">Name</th>
                    <th className="text-left px-4 py-2 border">Category</th>
                    <th className="text-left px-4 py-2 border">Amount</th>
                </tr>
                </thead>
                <tbody>
                {filteredExpenses.map((expense, index) => (
                    <tr key={expense.id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{format(new Date(parseInt(expense.date)),"MMMM")}</td>
                    <td className="border px-4 py-2">{expense.title}</td>
                    <td className="border px-4 py-2">{capitalizeFirstLetter(expense.category)}</td>
                    <td className="border px-4 py-2">${expense.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
  </div>
    );
};

export default UserExpensesTable;

