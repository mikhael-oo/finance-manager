import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserExpensesTable = ({ userId }) => {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAmountRange, setSelectedAmountRange] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/api/expense/'+ userId);
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
    (selectedMonth ? expense.month === parseInt(selectedMonth) : true) &&
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
                    
                    <th className="text-left px-4 py-2 border">Amount</th>
                </tr>
                </thead>
                <tbody>
                {filteredExpenses.map((expense, index) => (
                    <tr key={expense.id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{expense.month}</td>
                    <td className="border px-4 py-2">{expense.category}</td>
                    
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

