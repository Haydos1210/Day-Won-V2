import { useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Landing from './Auth/Landing'
import Dashboard from './Components/Dashboard'
import Register from './Auth/Register'
import Login from './Auth/Login'
import Profile from './Components/Profile'

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
        {/* <Route path='/Login' element={<Login successCallback={authenticate} />}/>
        <Route path='/Register' element={<Register successCallback={authenticate} />}/> */}
        <Route path='/Dashboard' element={<Dashboard />}/>
        {/* <Route path='/presentation/:id' element={<EditPresentation token={token} />}/>
        <Route path='/presentation/:id/preview' element={<PreviewPresentation token={token} />}/> */}
        <Route path='/Login' element={<Login successCallback={authenticate} />}/>
        <Route path='/Register' element={<Register successCallback={authenticate} />}/> 
        <Route path='/Profile' element={<Profile/>}/> 
        {/*
          <Route path='/Dashboard' element={<Dashboard token={token} logOut={logOut} onClickHome={() => navigate('/')}/>}/>
          <Route path='/presentation/:id' element={<EditPresentation token={token} />}/>
          <Route path='/presentation/:id/preview' element={<PreviewPresentation token={token} />}/>
        */}
      </Routes>

    </>
  )
}

export default App
