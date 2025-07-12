import { useState } from 'react'
import './App.css'
import DeviceCard from './components/DeviceComponent'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Dashboard />} /> 
    </Routes>
    </>
  )
}

export default App
