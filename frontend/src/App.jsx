import { useState } from 'react';
import './App.css';
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

function App() {

  const [currentForm, setCurrentForm] = useState('Login')
  
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
        <Routes>
          <Route index element={currentForm === "Login" ? <Login onFormSwitch={toggleForm}/> : <SignUp onFormSwitch={toggleForm}/>} />
          <Route path='/home' element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path='/expense' element={<Layout />}>
            <Route index element={<Expense />} />
          </Route>
          <Route path='/bill' element={<Layout />}>
            <Route index element={<Bill />} />
          </Route>
          <Route path='/planning' element={<Layout />}>
            <Route index element={<Planning />} />
          </Route>
          <Route path='/account' element={<Layout />}>
            <Route index element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AppProvider>
      
    </div>
  );
}

export default App;
