import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import { Account } from './components/pages/Account'
import { Bill } from './components/pages/Bill'
import { Expense } from './components/pages/Expense'
import { Home } from './components/pages/Home'
import Layout from './components/pages/Layout'
import { Planning } from './components/pages/Planning'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/expense" element={<Layout />}>
          <Route index element={<Expense />} />
        </Route>
        <Route path="/bill" element={<Layout />}>
          <Route index element={<Bill />} />
        </Route>
        <Route path="/planning" element={<Layout />}>
          <Route index element={<Planning />} />
        </Route>
        <Route path="/account" element={<Layout />}>
          <Route index element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
