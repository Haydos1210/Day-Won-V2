import { useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Landing from './Auth/Landing'
import Dashboard from './Components/Dashboard'
import Register from './Auth/Register'
import Login from './Auth/Login'
import Profile from './Components/Profile'
import Deck from './Components/Deck'

function App() {

  const navigate = useNavigate();

  const authenticate = () => {
      console.log("User authenticated");
      navigate("/Dashboard");
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/Login' element={<Login successCallback={authenticate} />}/>
        <Route path='/Register' element={<Register authenticate={authenticate} />}/> 
        <Route path='/Dashboard' element={<Dashboard />}/>
        <Route path='/Profile' element={<Profile/>}/> 
        <Route path='/decks/:deckId' element={<Deck />} />
      </Routes>

    </>
  )
}

export default App
