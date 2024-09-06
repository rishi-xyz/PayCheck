import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Dashboard} from "./pages/Dashboard";
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import Homepage from './pages/Home';
import PrivateRourte from '../../frontend/src/components/auth/PrivateRourte';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/dashboard' 
          element={
          <PrivateRourte>
            <Dashboard />
          </PrivateRourte>
          }
        />
        <Route path='/send' element={<></>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
