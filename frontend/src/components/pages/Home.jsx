//import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import { React, useState, useContext } from 'react';
import SavingsIcon from '@mui/icons-material/Savings'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import {GiExpense} from "react-icons/gi";
import {CiMoneyBill} from "react-icons/ci";
import { Chart } from "react-google-charts";
import AuthContext from '../login/AuthContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export const Home = () => {

    const authContext = useContext(AuthContext);

    var expensesNumber = 0;
    var lastMonthExpensesNumber = 0;
    var savingsNumber = 0;
    var budgetNumber = 0;

    async function updateCharts(date) {
        var currMonth = date.getMonth();
        try {
            const expensesResponse = await axios.get('http://localhost:3000/api/expense/'+ authContext.userId);
            var expensesList = expensesResponse.data;
            var currExpensesList = expensesList.filter(e => e.month === currMonth);
            var prevExpensesList = expensesList.filter(e => e.month === (currMonth - 1));

            for (let i = 0; i < currExpensesList.length; i++) {
                expensesNumber += currExpensesList[i].amount;
            }

            for (let i = 0; i < prevExpensesList.length; i++) {
                lastMonthExpensesNumber += prevExpensesList[i].amount;
            }

            const budgetResponse = await axios.get('http://localhost:3000/api/budget/'+ authContext.userId);
            var budgetList = budgetResponse.data;
            budgetList = budgetList.filter(e => e.month === currMonth);
            for (let i = 0; i < budgetList.length; i++) {
                budgetNumber += budgetList[i].housing;
                budgetNumber += budgetList[i].utilities;
                budgetNumber += budgetList[i].transportation;
                budgetNumber += budgetList[i].food;
                budgetNumber += budgetList[i].entertainment;
                budgetNumber += budgetList[i].saving;
                budgetNumber += budgetList[i].miscellaneous;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
            <p className="text-2xl font-semibold">Home </p>
            <main>
                <h1>Dashboard</h1>
                <p>User ID: {authContext.userId}</p>

                <div className="date">
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} onSelect={updateCharts(startDate)}/>
                </div>

                <div className="insights">

                    <div className="Savings">
                    <SavingsIcon />
                        <div className="middle">
                            <div className="left">
                                <h3>Total Savings: </h3>
                                <h1>{savingsNumber}</h1>
                            </div>
                            <div className="savings-chart">
                                {/* Insert chart of savings vs. debt here */}
                                <Chart
                                    chartType="ColumnChart"
                                    data={[["Type", "Amount"], ["Savings", savingsNumber], ["Expenses", expensesNumber]]}
                                    options={{title: "Savings vs. Expenses",
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
                                <h1>{expensesNumber}</h1>
                            </div>
                            <div className="expenses-chart">
                                {/* Insert chart of debt vs last month here */}
                                <Chart
                                    chartType="ColumnChart"
                                    data={[["Type", "Amount"], ["Current month", expensesNumber], ["Last month", lastMonthExpensesNumber]]}
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
                                <h3>Total Budget for month: </h3>
                                <h1>{budgetNumber}</h1>
                            </div>
                            <div className="debt-chart">
                                {/* Insert chart of bugdet to see how far off from cap it is */}
                                <Chart
                                    chartType="Gauge"
                                    data={[["Label", "Value"], ["Current", (expensesNumber/budgetNumber)*100]]}
                                    options={{width: 300, height: 250,
                                                greenFrom: 0, greenTo: 75,
                                                yellowFrom: 75, yellowTo: 90, 
                                                redFrom: 90, redTo: 100}}
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
                                <th>Description</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Movie Ticket</td>
                                <td>Leisure</td>
                                <td>$10.00</td>
                                <td>Batman</td>
                                <td>March 30th 2023</td>
                            </tr>
                            <tr>
                                <td>Movie Ticket</td>
                                <td>Leisure</td>
                                <td>$10.00</td>
                                <td>Batman</td>
                                <td>March 30th 2023</td>
                            </tr>
                            <tr>
                                <td>Movie Ticket</td>
                                <td>Leisure</td>
                                <td>$10.00</td>
                                <td>Batman</td>
                                <td>March 30th 2023</td>
                            </tr>
                            <tr>
                                <td>Movie Ticket</td>
                                <td>Leisure</td>
                                <td>$10.00</td>
                                <td>Batman</td>
                                <td>March 30th 2023</td>
                            </tr>
                            <tr>
                                <td>Movie Ticket</td>
                                <td>Leisure</td>
                                <td>$10.00</td>
                                <td>Batman</td>
                                <td>March 30th 2023</td>
                            </tr>
                        </tbody>
                    </table>
                    <a href="#">Show All</a>
                </div>
            </main>
            {/* -----------------------------END OF MAIN------------------------------------------- */}

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