import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Landing from './Auth/Landing'
import Dashboard from './Components/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />}/>
        {/* <Route path='/Login' element={<Login successCallback={authenticate} />}/>
        <Route path='/Register' element={<Register successCallback={authenticate} />}/> */}
        <Route path='/Dashboard' element={<Dashboard />}/>
        {/* <Route path='/presentation/:id' element={<EditPresentation token={token} />}/>
        <Route path='/presentation/:id/preview' element={<PreviewPresentation token={token} />}/> */}
      </Routes>

    </>
  )
}

export default App
