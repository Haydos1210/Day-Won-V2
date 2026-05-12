import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Landing from './Auth/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />}/>
        {/* <Route path='/Login' element={<Login successCallback={authenticate} />}/>
        <Route path='/Register' element={<Register successCallback={authenticate} />}/>
        <Route path='/Dashboard' element={<Dashboard token={token} logOut={logOut} onClickHome={() => navigate('/')}/>}/>
        <Route path='/presentation/:id' element={<EditPresentation token={token} />}/>
        <Route path='/presentation/:id/preview' element={<PreviewPresentation token={token} />}/> */}
      </Routes>

    </>
  )
}

export default App
