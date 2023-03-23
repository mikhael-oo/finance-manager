import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to ="/home">Home</Link>
                    </li>
                    <li>
                        <Link to ="/expense">Expense Tracking</Link>
                    </li>
                    <li>
                        <Link to ="/bill">Bill/Debt Management</Link>
                    </li>
                    <li>
                        <Link to ="/planning">Financial Planning</Link>
                    </li>
                    <li>
                        <Link to ="/account">Account Details</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;