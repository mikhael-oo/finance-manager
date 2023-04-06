import Login from "./components/login/Login"
import SignUp from "./components/signup/SignUp"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Account } from './components/pages/Account'
import { Expense } from './components/pages/Expense'
import { Home } from './components/pages/Home'
import History from "./components/history/History"
import Layout from './components/pages/Layout'
import { Budget } from './components/pages/Budget'
import {React, useState } from 'react';
import { AuthContext } from './components/login/AuthContext';


function App() {

  const [currentForm, setCurrentForm] = useState('Login')
  const [userId, setUserId] = useState(null)
  
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
      <AuthContext.Provider value={{ userId, setUserId }}>
      <BrowserRouter>

      {!userId ? 
        <div className="App flex">
          <Routes>
            <Route path="/" index element={currentForm === "Login" ? <Login onFormSwitch={toggleForm}/> : <SignUp onFormSwitch={toggleForm}/>} />
          </Routes>        
        </div> 
        :
        <div className="App flex">
          <Layout />
          <main className='p-7'>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/account" element={<Account />} />
              <Route path="/history" element={<History userId={userId}/>} />
            </Routes>
          </main>
        </div>
    }
      </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
