// import { useState } from 'react';
import './App.css';
import Login from "./components/login/Login"
import SignUp from "./components/signup/SignUp"
import {React, useState } from 'react';

function App() {

  const [currentForm, setCurrentForm] = useState('Login')
  
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "Login" ? <Login onFormSwitch={toggleForm}/> : <SignUp onFormSwitch={toggleForm}/>
      }
      
    </div>
  );
}

export default App;



// import { Routes, Route } from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/SignUp" element={<SignUp />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;