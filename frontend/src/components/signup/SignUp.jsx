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
    } catch (err) {
      console.error(err);
      alert('Error creating user');
    }
  };


   return(
       <div className="flex justify-center items-center h-screen bg-gray-100">
           <form className= " bg-white p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
               <label htmlFor="fname" className='block text-gray-700 font-bold mb-2'>First Name:</label>
                   <input
                       className='border border-gray-400 p-2 w-full rounded focus:outline-none focus:border-blue-500'
                       name="fname"
                       type="text"
                       id="fname"
                       value={fname}
                       onChange={(e) => setFname(e.target.value)}
                   />
                   <label htmlFor='lname' className='block text-gray-700 font-bold mb-2'>Last Name:</label>
                   <input
                       className='border border-gray-400 p-2 w-full rounded focus:outline-none focus:border-blue-500'
                       name="lname"
                       type="text"
                       id="lname"
                       value={lname}
                       onChange={(e) => setLname(e.target.value)}
                   />
                   <label htmlFor='username' className='block text-gray-700 font-bold mb-2'>Username:</label>
                   <input
                       className='border border-gray-400 p-2 w-full rounded focus:outline-none focus:border-blue-500'
                       name="username"
                       type="text"
                       id="username"
                       value={user}
                       onChange={(e) => setUser(e.target.value)}
                   />
                   <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>Email:</label>
                   <input
                       className='border border-gray-400 p-2 w-full rounded focus:outline-none focus:border-blue-500'
                       name="email"
                       type="email"
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                   />
               <label htmlFor='password' className='block text-gray-700 font-bold mb-2'>Password:</label>
                   <input
                        className='border border-gray-400 p-2 w-full rounded focus:outline-none focus:border-blue-500'
                       name="password"
                       type="password"
                       id="password"
                       value={pass}
                       onChange={(e) => setPass(e.target.value)}
                   />
               <input className="bg-dark-green hover:bg-light-green text-white font-bold py-2 px-4 rounded" type="submit" />
           </form>
           <button className="link-btn" onClick={ () => props.onFormSwitch('Login')}>Already Have an Account? Login Here</button>
       </div>
   )
}

export default SignUp;