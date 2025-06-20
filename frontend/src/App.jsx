import React from 'react'
import Navbar from './components/Navbar'

import Homepage from './pages/Homepage'
import TaskPage from './pages/TaskPage'

import { Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { Toaster } from 'react-hot-toast'

function App() {
  const {theme} = useTheme()
  return (

    <div className='min-h-screen bg-base-200 transition-colors duration-300' data-theme={theme}>

        <Navbar/>

        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/tasks/:id" element={<TaskPage/>}/>
        </Routes>
    <Toaster/>
    </div>
  )
}

export default App