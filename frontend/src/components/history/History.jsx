import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserExpensesTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAmountRange, setSelectedAmountRange] = useState('');

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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAmountRangeChange = (event) => {
    setSelectedAmountRange(event.target.value);
  };

  const filteredExpenses = expenses.filter((expense) =>
    (selectedMonth ? expense.month === selectedMonth : true) &&
    (selectedCategory ? expense.category === selectedCategory : true) &&
    (selectedAmountRange ? 
      (selectedAmountRange === 'low' ? expense.amount < 50 : expense.amount >= 50) : true)
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
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
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
                    <th className="text-left px-4 py-2 border">Category</th>
                    <th className="text-left px-4 py-2 border">Description</th>
                    <th className="text-left px-4 py-2 border">Amount</th>
                </tr>
                </thead>
                <tbody>
                {filteredExpenses.map((expense, index) => (
                    <tr key={expense.id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{expense.month}</td>
                    <td className="border px-4 py-2">{expense.category}</td>
                    <td className="border px-4 py-2">{expense.description}</td>
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

