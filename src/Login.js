import { React, useState } from 'react';
import GoogleLogin from 'react-google-login';
import ReactDOM from 'react-dom/client';

const client_id = "957102263669-78ltmrplrpp1hchi5e333efnlsl2mqsv.apps.googleusercontent.com"



function Login(props) {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("submitted")
        console.log(user)
        console.log(pass)
    }

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESSFUL!!! USER: ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("LOGIN UNSUCCESSFUL!!! res: ", res);
    }

    return(
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Username/email:</label>
                    <input
                        name="username"
                        type="text"
                        id="username"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                
                <label>Password:</label> 
                    <input
                        name="password"
                        type="password"
                        id="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />     
                <input type="submit" />
            </form>

            <div id="googleLogin">

                <GoogleLogin
                    clientId='client_id'
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />

            </div>

            
            <button className="link-btn" onClick={ () => props.onFormSwitch('SignUp')}>Don't Have an Account? Register Here</button>

        </div>
    )
}

export default Login;
