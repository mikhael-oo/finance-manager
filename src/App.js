import {React, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./Login.js"
import SignUp from "./SignUp.js"
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const client_id = "957102263669-78ltmrplrpp1hchi5e333efnlsl2mqsv.apps.googleusercontent.com"


function App() {

  useEffect(() => {

    function start() {
      gapi.client.init({
        clientId: client_id,
        scope: ""
      })
    };

    gapi.load('client:auth2', start);
  })

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
