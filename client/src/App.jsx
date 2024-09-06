import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Dashboard  from "./pages/Dashboard";
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import Homepage from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import SendMoney from './pages/SendMoney';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route path='/send' 
          element={
            <PrivateRoute>
              <SendMoney />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
