import { useState } from 'react';
import axios from 'axios';

// const handleSubmit = (event) => {
//    event.preventDefault();
//    alert("submitted")
//    console.log(user.value)
// }




function SignUp(props) {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

//    const handleSubmit = (event) => {
//     event.preventDefault();
//     alert("submitted")
//     console.log(user)
// }

// const handleSubmit = async (event) => {
//     event.preventDefault();
//     const newUser = {
//         fname,
//         lname,
//         email,
//         username: user,
//         password: pass,
//       };
//       try {
//         const response = await fetch('http://localhost:3000/api/user/users', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newUser),
//         });
//         if (!response.ok) {
//           throw new Error(`Server error: ${response.status} ${response.statusText}`);
//         }
//         const data = await response.json();
//         console.log(data); // do something with the response data
//       } catch (error) {
//         console.error(error);
//       }
//   };

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const response = await axios.post('http://localhost:3000/api/user/register', {
        fname: fname,
        lname: lname,
        email: email,
        username: user,
        password: pass
    });
    alert('User created successfully');
    console.log(response.data.user);
    navigate(`/`);
    } catch (err) {
    console.error(err);
    alert('Error creating user');
    }
};


//    return(
//        <div className="flex justify-center items-center h-screen bg-gray-100">
//            <form className= " bg-white p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
//                <label htmlFor="fname" className='block text-gray-700 font-bold mb-2'>First Name:</label>
//                    <input
//                        className='border border-gray-400 p-2 w-full rounded focus:outline-none focus:border-blue-500'
//                        name="fname"
//                        type="text"
//                        id="fname"
//                        value={fname}
//                        onChange={(e) => setFname(e.target.value)}
//                    />
//                    <label htmlFor='lname' className='block text-gray-700 font-bold mb-2'>Last Name:</label>
//                    <input
//                        className='border border-gray-400 p-2 w-full rounded focus:outline-none focus:border-blue-500'
//                        name="lname"
//                        type="text"
//                        id="lname"
//                        value={lname}
//                        onChange={(e) => setLname(e.target.value)}
//                    />
//                    <label htmlFor='username' className='block text-gray-700 font-bold mb-2'>Username:</label>
//                    <input
//                        className='border border-gray-400 p-2 w-full rounded focus:outline-none focus:border-blue-500'
//                        name="username"
//                        type="text"
//                        id="username"
//                        value={user}
//                        onChange={(e) => setUser(e.target.value)}
//                    />
//                    <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>Email:</label>
//                    <input
//                        className='border border-gray-400 p-2 w-full rounded focus:outline-none focus:border-blue-500'
//                        name="email"
//                        type="email"
//                        id="email"
//                        value={email}
//                        onChange={(e) => setEmail(e.target.value)}
//                    />
//                <label htmlFor='password' className='block text-gray-700 font-bold mb-2'>Password:</label>
//                    <input
//                         className='border border-gray-400 p-2 w-full rounded focus:outline-none focus:border-blue-500'
//                        name="password"
//                        type="password"
//                        id="password"
//                        value={pass}
//                        onChange={(e) => setPass(e.target.value)}
//                    />
//                <input className="bg-dark-green hover:bg-light-green text-white font-bold py-2 px-4 rounded" type="submit" />
//            </form>
//            <button className="link-btn" onClick={ () => props.onFormSwitch('Login')}>Already Have an Account? Login Here</button>
//        </div>
//    )

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fname"
                        id="fname"
                        value={fname}
                        placeholder="First Name"
                        onChange={(e) => setFname(e.target.value)} />

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="lname"
                        id="lname"
                        value={lname}
                        placeholder="Lastname"
                        onChange={(e) => setLname(e.target.value)} />

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        id="username"
                        value={user}
                        placeholder="Username"
                        onChange={(e) => setUser(e.target.value)} />

                    <input
                        type="email"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        id="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} />
                        

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        id="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Password" />

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                        onClick={handleSubmit}
                    >Create Account</button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <a className="no-underline border-b border-blue text-blue" onClick={ () => props.onFormSwitch('Login')}>
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    )
}

export default SignUp;