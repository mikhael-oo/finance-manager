// import { useState } from 'react';
import Login from "./components/login/Login"
import SignUp from "./components/signup/SignUp"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Account } from './components/pages/Account'
import { Bill } from './components/pages/Bill'
import { Expense } from './components/pages/Expense'
import { Home } from './components/pages/Home'
import Layout from './components/pages/Layout'
import { Planning } from './components/pages/Planning'
import { AppProvider } from './context/AppContext'
import {React, useState } from 'react';

function App() {

  const [currentForm, setCurrentForm] = useState('Login')
  
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <AppProvider>
      <BrowserRouter>
      
        <div className="App flex">
          <Layout />
          <main className='p-7'>
            <Routes>
              <Route index element={currentForm === "Login" ? <Login onFormSwitch={toggleForm}/> : <SignUp onFormSwitch={toggleForm}/>} />
              <Route path="/home" element={<Home />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/bill" element={<Bill />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </main>

        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
