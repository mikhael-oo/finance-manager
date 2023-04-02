//import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import SavingsIcon from '@mui/icons-material/Savings'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import {GiExpense} from "react-icons/gi";
import {CiMoneyBill} from "react-icons/ci";
import { Chart } from "react-google-charts"



export const Home = () => {
    return (
        <div>
            <p className="text-2xl font-semibold">Home </p>
            <main>
                <h1>Dashboard</h1>

                <div className="date">
                    <input type="date" />
                </div>

                <div className="insights">

                    <div className="Savings">
                    <SavingsIcon />
                        <div className="middle">
                            <div className="left">
                                <h3>Total Savings</h3>
                                <h1>Insert api call to savings number</h1>
                            </div>
                            <div className="savings-chart">
                                {/* Insert chart of savings vs. debt here */}
                                <Chart
                                    chartType="ColumnChart"
                                    data={[["Type", "Amount"], ["Savings", 60], ["Debt", 40]]}
                                    options={{title: "Savings vs. Debt",
                                                legend: { position: "none"}}}
                                    width={"50%"}
                                    height={"200px"}
                                />
                            </div>
                        </div>
                    </div>
                    {/* -----------------------------END OF SAVINGS------------------------------------------- */}

                    <div className="Expenses">
                    <GiExpense />
                        <div className="middle">
                            <div className="left">
                                <h3>Total Expenses</h3>
                                <h1>Insert api call to expeneses number</h1>
                            </div>
                            <div className="expenses-chart">
                                {/* Insert chart of debt vs last month here */}
                                <Chart
                                    chartType="ColumnChart"
                                    data={[["Type", "Amount"], ["Current", 20], ["Last Month", 50]]}
                                    options={{title: "Debt vs. Last Month's debt",
                                                legend: { position: "none"}}}
                                    width={"50%"}
                                    height={"200px"}
                                    
                                />
                            </div>
                        </div>
                    </div>
                    {/* -----------------------------END OF EXPENSES------------------------------------------- */}

                    <div className="Budget">
                    <CiMoneyBill />
                        <div className="middle">
                            <div className="left">
                                <h3>Total Budget for month</h3>
                                <h1>Insert api call to budget number</h1>
                            </div>
                            <div className="debt-chart">
                                {/* Insert chart of bugdet to see how far off from cap it is */}
                                <Chart
                                    chartType="Gauge"
                                    data={[["Label", "Value"], ["Current", 50]]}
                                    options={{title: "How far from budget cap",
                                                width: 500, height: 250,
                                                greenFrom: 0, greenTo: 75, 
                                                redFrom: 90, redTo: 100, 
                                                yellowFrom: 75, yellowTo: 90}}
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