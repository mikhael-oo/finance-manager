 import { React, useState } from 'react';

 const handleSubmit = (event) => {
    event.preventDefault();
    alert("submitted")
    //console.log(user)
    //console.log(pass)
}
 
 
 

function SignUp(props) {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    return(
        <div className="auth-form-container">
            <form className= "signup-form" onSubmit={handleSubmit}>
                <label>Full Name:</label>
                    <input
                        name="name"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                <label>Email:</label>
                    <input
                        name="email"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                <label>Username:</label>
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
            <button className="link-btn" onClick={ () => props.onFormSwitch('Login')}>Already Have an Account? Login Here</button>
        </div>
    )
}

export default SignUp;