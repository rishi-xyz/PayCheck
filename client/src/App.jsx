import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from './pages/Signup'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          {/* <Route path='/signup' element={<Signup />}/>
          <Route path='/signin' element={<></>}/>
          <Route path='/dashboard' element={<></>}/>
          <Route path='/send' element={<></>}/> */} 
        </Routes>
      </BrowserRouter>      
    </>
  )
}

export default App
