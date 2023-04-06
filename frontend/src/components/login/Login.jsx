import { React, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

function Login(props) {
    
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/api/user/login', {
            username: user,
            password: pass
        });
        alert('User logged in successfully');
        console.log(response.data.user.id);
        authContext.setUserId(response.data.user.id);
        navigate(`/home`);
        } catch (err) {
        console.error(err);
        alert('Error logging in user');
        }
    };

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
                    <label>Username/email:</label>
                    <input
                        name="username"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        type="text"
                        id="username"
                        value={user}
                        onChange={(e) => setUser(e.target.value)} />
                
                    <label>Password:</label> 
                    <input
                    name="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    type="password"
                    id="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />     
            <input
                type="submit"
                className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                onClick={handleSubmit}
                />
                <div className="text-grey-dark mt-6">
                    Don't have an account? <a className="no-underline border-b border-blue text-blue" onClick={ () => props.onFormSwitch('SignUp')}>
                    Register Here</a>.
                </div>
            </div>
        </div>
    </div>
    )

}

export default Login;