// import { useState } from 'react';
import Login from "./components/login/Login"
import SignUp from "./components/signup/SignUp"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Account } from './components/pages/Account'
import { Bill } from './components/pages/Bill'
import { Expense } from './components/pages/Expense'
import { Home } from './components/pages/Home'
import History from "./components/history/History"
import Layout from './components/pages/Layout'
import { Planning } from './components/pages/Planning'
import { AppProvider } from './context/AppContext'
import {React, useState } from 'react';
import { AuthContext } from './components/login/AuthContext';


function App() {

  const [currentForm, setCurrentForm] = useState('Login')
  const [userId, setUserId] = useState(null)
  
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <AppProvider>
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
              <Route path="/bill" element={<Bill />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/account" element={<Account />} />
              <Route path="/history" element={<History userId={userId}/>} />
            </Routes>
          </main>
        </div>
      }
      
        <div className="App flex">
          <Layout />
          <main className='p-7'>
            <Routes>
              <Route path="/" index element={currentForm === "Login" ? <Login onFormSwitch={toggleForm}/> : <SignUp onFormSwitch={toggleForm}/>} />
              <Route path="/home" element={<Home />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/bill" element={<Bill />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/account" element={<Account />} />
              <Route path="/history" element={<History userId={userId}/>} />
            </Routes>
          </main>

        </div>
      </BrowserRouter>
      </AuthContext.Provider>
    </AppProvider>
  );
}

export default App;
