import { React, useState, useContext, useEffect } from 'react';
import SavingsIcon from '@mui/icons-material/Savings'
import {GiExpense} from "react-icons/gi";
import {CiMoneyBill} from "react-icons/ci";
import { Chart } from "react-google-charts";
import AuthContext from '../login/AuthContext';
import { format } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export const Home = () => {

    const authContext = useContext(AuthContext);

    const [expenseTotal, setExpenseTotal] = useState(0.00);
    const [expenseLastTotal, setExpenseLastTotal] = useState(0.00);
    const [savingsTotal, setSavingTotal] = useState(0.00);
    const [budgetTotal, setBudgetTotal] = useState(0.00);
    const [expenseList, setExpenseList] = useState([]);
    const [recentExpenseList, setRecentExpenseList] = useState([]);

    const updateCharts = async () => {
        var expensesNumber = 0.00;
        var lastMonthExpensesNumber = 0.00;
        var savingsNumber = 0.00;
        var budgetNumber = 0.00;
        var currMonth = (new Date()).getMonth();
        try {
            const expensesResponse = await axios.get('http://localhost:3000/api/expense/'+ authContext.userId);
            // const expensesResponse = await axios.get('http://localhost:3000/api/expense/1');

            console.log(expensesResponse.data)

            var expensesList = expensesResponse.data;
            var currExpensesList = expensesList.filter(e => e.month === currMonth);
            var prevExpensesList = expensesList.filter(e => e.month === (currMonth - 1));
            setExpenseList(expensesList)
            // console.log(currExpensesList)
            // console.log("test")
            // console.log(prevExpensesList)

            for (let i = 0; i < currExpensesList.length; i++) {
                expensesNumber += parseFloat(currExpensesList[i].amount);
            }
            setExpenseTotal(expensesNumber)
            // console.log(expensesNumber)
            // console.log(expenseTotal)

            for (let i = 0; i < prevExpensesList.length; i++) {
                lastMonthExpensesNumber += parseFloat(prevExpensesList[i].amount);
            }
            setExpenseLastTotal(lastMonthExpensesNumber);

            var savingsList = currExpensesList.filter(e => e.category === "saving")
            for (let i = 0; i < savingsList.length; i++) {
                savingsNumber += parseFloat(savingsList[i].amount)
            }
            setSavingTotal(savingsNumber);

            const budgetResponse = await axios.get('http://localhost:3000/api/budget/'+ authContext.userId);
            // const budgetResponse = await axios.get('http://localhost:3000/api/budget/1');
            var budgetList = budgetResponse.data;
            budgetList = budgetList.filter(e => e.month === currMonth);
            for (let i = 0; i < budgetList.length; i++) {
                budgetNumber += parseFloat(budgetList[i].housing);
                budgetNumber += parseFloat(budgetList[i].utilities);
                budgetNumber += parseFloat(budgetList[i].transportation);
                budgetNumber += parseFloat(budgetList[i].food);
                budgetNumber += parseFloat(budgetList[i].entertainment);
                budgetNumber += parseFloat(budgetList[i].saving);
                budgetNumber += parseFloat(budgetList[i].miscellaneous);
            }
            setBudgetTotal(budgetNumber);
            // console.log(budgetTotal)


        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        updateCharts();
    },[])

    function capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1)
      }

    
    return (
        <div>
            <p className="text-2xl font-semibold">Home </p>
            <main>
                <h1>Dashboard</h1>
                {/* <p>User ID: {authContext.userId}</p> */}
                <p>User ID: {1}</p>

                <div className="insights">

                    <div className="Savings">
                    <SavingsIcon />
                        <div className="middle">
                            <div className="left">
                                <h3>Total Savings: </h3>
                                <h1>{savingsTotal}</h1>
                            </div>
                            <div className="savings-chart">
                                {/* Insert chart of savings vs. debt here */}
                                <Chart
                                    chartType="ColumnChart"
                                    data={[["Type", "Amount"], ["Savings", savingsTotal], ["Total", expenseTotal]]}
                                    options={{title: "Savings vs. Total Spent",
                                                legend: { position: "none"}}}
                                    width={"100%"}
                                    height={"300px"}
                                />
                            </div>
                        </div>
                    </div>
                    {/* -----------------------------END OF SAVINGS------------------------------------------- */}

                    <div className="Expenses">
                    <GiExpense />
                        <div className="middle">
                            <div className="left">
                                <h3>Total Expenses: </h3>
                                <h1>{expenseTotal}</h1>
                            </div>
                            <div className="expenses-chart">
                                {/* Insert chart of debt vs last month here */}
                                <Chart
                                    chartType="ColumnChart"
                                    data={[["Type", "Amount"], ["Current month", expenseTotal], ["Last month", expenseLastTotal]]}
                                    options={{title: "This months' expenses vs. Last month's expenses",
                                                legend: { position: "none"}}}
                                    width={"100%"}
                                    height={"300px"}
                                    
                                />
                            </div>
                        </div>
                    </div>
                    {/* -----------------------------END OF EXPENSES------------------------------------------- */}

                    <div className="Budget">
                    <CiMoneyBill />
                        <div className="middle">
                            <div className="left">
                                <h3>Percent of Budget Spent for Month: </h3>
                                <h1>{budgetTotal}</h1>
                            </div>
                            <div className="debt-chart">
                                {/* Insert chart of bugdet to see how far off from cap it is */}
                                <Chart
                                    chartType="Gauge"
                                    data={[["Label", "Value"], ["Current", (expenseTotal/budgetTotal)*100]]}
                                    options={{width: 300, height: 250,
                                                greenFrom: 0, greenTo: 75,
                                                yellowFrom: 75, yellowTo: 90, 
                                                redFrom: 90, redTo: 100,
                                                minorTicks: 1}}
                                />
                            </div>
                        </div>
                    </div>
                    {/* -----------------------------END OF Budget------------------------------------------- */}
                </div>
                {/* -----------------------------END OF INSIGHTS------------------------------------------- */}

                <div className="recent-expenses">
                    <h2>Recent Expenses</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenseList.slice(-5).reverse().map((expense) => (
                                <tr key={expense.id}>
                                    <td>{expense.title}</td>
                                    <td>{capitalizeFirstLetter(expense.category)}</td>
                                    <td>{expense.amount}</td>
                                    <td>{format(new Date(parseInt(expense.date)), "dd/M/yyyy")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* <a href="/expense">Show All</a> */}
                </div>
            </main>
            {/* -----------------------------END OF MAIN------------------------------------------- */}
{/* 
            <div className="right">
                <div className="top">
                    <button id="menu-btn">
                        MENU BUTTON HERE???
                    </button>
                    <div className="theme-toggler">
                        <LightModeOutlinedIcon className='lightmode'/>
                        <DarkModeOutlinedIcon className='darkmode'/>
                    </div>
                    <div className="profile">
                        <div className="info">
                            <p>Hey, <b>User</b> </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* -----------------------------END OF TOP------------------------------------------- */}
 


        </div>
    );
};