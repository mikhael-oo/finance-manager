import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(props) {
    
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/api/user/login', {
            username: user,
            password: pass
          });
          alert('User logged in successfully');
          console.log(response.data.user);
        } catch (err) {
          console.error(err);
          alert('Error loggin in user');
        }
      };

    // const onSuccess = (res) => {
    //     console.log("LOGIN SUCCESSFUL!!! USER: ", res.profileObj);
    // }

    // const onFailure = (res) => {
    //     console.log("LOGIN UNSUCCESSFUL!!! res: ", res);
    // }

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

            <button className="link-btn" onClick={ () => props.onFormSwitch('SignUp')}>Don't Have an Account? Register Here</button>

        </div>
    )
}

export default Login;