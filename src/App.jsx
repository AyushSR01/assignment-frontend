import Home from './view/User/home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AuthForm from './view/User/sign_in'
import AuthForm2 from './view/User/sign_up'
import Dashboard from './view/User/main_user';
import Dashboardop from './view/operation/dashboard';
import Dashboardad from './view/Admin/dashboard';
import Optioncheck from './view/User/option';

function App() {
  

  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<AuthForm />} />
        <Route path="/signup" element={<AuthForm2 />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboardop" element={<Dashboardop/>}/>
        <Route path="/dashboardad" element={<Dashboardad/>}/>
        <Route path="/support" element={<Optioncheck/>}/>
      </Routes>
    </Router>
  )
}

export default App
