import {React, useContext, useEffect, useState} from "react";
import AuthContext from '../login/AuthContext';
import axios from 'axios';













export const Account = () => {

    const authContext = useContext(AuthContext);

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const updateFname = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/api/users/updatefname/' + authContext.userId + '/' + fname);
            alert('First Name updated successfully');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error updating first name');
        }
        // setShowFoodPopup(false);
    };

    const updateLname = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/api/users/updatelname/' + authContext.userId + '/' + lname);
            alert('First Name updated successfully');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error updating first name');
        }
        // setShowFoodPopup(false);
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/api/users/updateuser/' + authContext.userId + '/' + user);
            alert('First Name updated successfully');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error updating first name');
        }
        // setShowFoodPopup(false);
    };

    const updateEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/api/users/updateemail/' + authContext.userId + '/' + email);
            alert('First Name updated successfully');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error updating first name');
        }
        // setShowFoodPopup(false);
    };

    const updatePass = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/api/users/updatepass/' + authContext.userId + '/' + pass);
            alert('First Name updated successfully');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error updating first name');
        }
        // setShowFoodPopup(false);
    };

    
    return (
        <div>
            <label htmlFor='accountFName'>First Name: </label>
            <input type='text' id='accountFName' value="" readOnly/>

            <label htmlFor='accountLName'>Last Name: </label>
            <input type='text' id='accountLName' value="" readOnly/>
            <br/>
            <br/>
            <label htmlFor='accountUName'>Username: </label>
            <input type='text' id='accountUName' value="" readOnly/>

            <label htmlFor='accountEmail'>Email: </label>
            <input type='text' id='accountEmail' value="" readOnly/>



            <div className="popup">
                <form onSubmit={updateFname}>
                    <label className='font-semibold'>Update First Name Here: </label>
                    <input
                    className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
                    type="text"
                    id="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    />
                    <button className="border-2 border-black rounded-md px-2 mx-1" type="submit">Confirm Update</button>
                    {/* <button className="border-2 border-black rounded-md px-2 mx-1" type="button" onClick={() => setShowUtilitiesPopup(false)}>
                    Cancel
                    </button> */}
                </form>
            </div>

            <div className="popup">
                <form onSubmit={updateLname}>
                    <label className='font-semibold'>Update Last Name Here: </label>
                    <input
                    className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
                    type="text"
                    id="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    />
                    <button className="border-2 border-black rounded-md px-2 mx-1" type="submit">Confirm Update</button>
                    {/* <button className="border-2 border-black rounded-md px-2 mx-1" type="button" onClick={() => setShowUtilitiesPopup(false)}>
                    Cancel
                    </button> */}
                </form>
            </div>

            <div className="popup">
                <form onSubmit={updateUser}>
                    <label className='font-semibold'>Update Username Here: </label>
                    <input
                    className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
                    type="text"
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    />
                    <button className="border-2 border-black rounded-md px-2 mx-1" type="submit">Confirm Update</button>
                    {/* <button className="border-2 border-black rounded-md px-2 mx-1" type="button" onClick={() => setShowUtilitiesPopup(false)}>
                    Cancel
                    </button> */}
                </form>
            </div>

            <div className="popup">
                <form onSubmit={updateEmail}>
                    <label className='font-semibold'>Update Email Here: </label>
                    <input
                    className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="border-2 border-black rounded-md px-2 mx-1" type="submit">Confirm Update</button>
                    {/* <button className="border-2 border-black rounded-md px-2 mx-1" type="button" onClick={() => setShowUtilitiesPopup(false)}>
                    Cancel
                    </button> */}
                </form>
            </div>


            <div className="popup">
                <form onSubmit={updatePass}>
                    <label className='font-semibold'>Update Password Here: </label>
                    <input
                    className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
                    type="password"
                    id="pass"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    />
                    <button className="border-2 border-black rounded-md px-2 mx-1" type="submit">Confirm Update</button>
                    {/* <button className="border-2 border-black rounded-md px-2 mx-1" type="button" onClick={() => setShowUtilitiesPopup(false)}>
                    Cancel
                    </button> */}
                </form>
            </div>













        </div>






















        
    );
};