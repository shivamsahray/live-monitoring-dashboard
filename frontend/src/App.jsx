import { useState } from 'react'
import './App.css'
import DeviceCard from './components/DeviceComponent'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Recordings from './pages/Recordings'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/recordings/:deviceId' element={<Recordings />} />
    </Routes>
    </>
  )
}

export default App
