import { React, useContext } from 'react';
import AuthContext from '../login/AuthContext';
import axios from "axios";

export const Account = () => {

    const authContext = useContext(AuthContext);

    var fname = "";
    var lname = "";
    var uname = "";
    var email = "";

    const getAccountDetails = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/user/'+ authContext.userId);
            fname = response.data.first_name;
            lname = response.data.last_name;
            uname = response.data.username;
            email = response.data.email;
            console.log(fname);
        } catch(error) {
            console.error(error);
        }
        document.getElementById("accountFName").value = fname;
        document.getElementById("accountLName").value = lname;
        document.getElementById("accountUName").value = uname;
        document.getElementById("accountEmail").value = email;
    }

    getAccountDetails()

    return (
        <div>
            <p className="text-2xl font-semibold">Account Details</p>
            <br/>
            <label htmlFor='accountFName'>First Name: </label><br/>
            <input className="border-2 border-black rounded text-black px-2" type='text' id='accountFName' readOnly/><br/>
            <br/>
            <label htmlFor='accountLName'> Last Name: </label><br/>
            <input className="border-2 border-black rounded text-black px-2" type='text' id='accountLName' readOnly/><br/>
            <br/>
            <label htmlFor='accountUName'>Username: </label><br/>
            <input className="border-2 border-black rounded text-black px-2" type='text' id='accountUName' readOnly/><br/>
            <br/>
            <label htmlFor='accountEmail'> Email: </label><br/>
            <input className="border-2 border-black rounded text-black px-2" type='text' id='accountEmail' readOnly/><br/>
        </div>
    );
};