import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import {BsArrowLeftShort} from "react-icons/bs";
import {AiOutlineHome} from "react-icons/ai";
import {GiExpense} from "react-icons/gi";
import {CiMoneyBill} from "react-icons/ci";
import {MdAttachMoney, MdAccountBalance} from "react-icons/md";

const Layout = () => {
    const [open, setOpen] = useState(true);
    return (
        <>
            <nav className={`bg-dark-green h-screen p-5 pt-8 ${open ? "w-72" : "w-24"} duration-300 relative `}>
                <BsArrowLeftShort className={`bg-white text-dark-green text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
                <ul > 
                    <li className="text-cream text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white">
                        <span className="text-2xl block float-left">
                            <AiOutlineHome />
                        </span>
                        <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"} `}>
                            <Link to ="/home">Home</Link>
                        </span>
                        
                    </li>
                    <li className="text-cream text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white">
                        <span className="text-2xl block float-left">
                            <GiExpense />
                        </span>
                        <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"} `}>
                            <Link to ="/expense">Expenses</Link>
                        </span>
                        
                    </li>
                    <li className="text-cream text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white">
                        <span className="text-2xl block float-left">
                            <CiMoneyBill />
                        </span>
                        <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"} `}>
                            <Link to ="/bill">Bill</Link>
                        </span>
                    </li>
                    <li className="text-cream text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white">
                        <span className="text-2xl block float-left">
                            <MdAttachMoney />
                        </span>
                        <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"} `}>
                            <Link to ="/planning">Finances</Link>
                        </span>
                    </li>
                    <li className="text-cream text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white">
                        <span className="text-2xl block float-left">
                            <MdAccountBalance />
                        </span>
                        <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"} `}>
                            <Link to ="/account">Account</Link>
                        </span>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;