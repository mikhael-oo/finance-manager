import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import {BsArrowLeftShort} from "react-icons/bs";

const Layout = () => {
    const [open, setOpen] = useState(true);
    return (
        <>
            <nav className={`bg-dark-purple h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}>
                <BsArrowLeftShort className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
                <ul > 
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