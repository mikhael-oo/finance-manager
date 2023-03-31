import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import {BsArrowLeftShort} from "react-icons/bs";

const Layout = () => {
    const [open, setOpen] = useState(true);
    return (
        <>
            <nav className={`bg-dark-purple h-screen p-5 pt-8 ${open ? "w-72" : "w-24"} duration-300 relative`}>
                <BsArrowLeftShort className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
                <ul > 
                    <li>
                        <Link to ="/home">Home</Link>
                    </li>
                    <li>
                        <Link to ="/expense">Expenses</Link>
                    </li>
                    <li>
                        <Link to ="/bill">Bill</Link>
                    </li>
                    <li>
                        <Link to ="/planning">Financials</Link>
                    </li>
                    <li>
                        <Link to ="/account">Account</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;