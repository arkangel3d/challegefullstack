import Navb from "./Components/NavBar";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import UserDetails from "./Components/userDetails";
import { useState, useEffect } from 'react'
function App() {
  const [userLogon, setUserLogon] = useState(false);
  
  useEffect(()=>{
    if(localStorage.getItem('user')){
      setUserLogon(true)
    }
  },[])
  return (
    <div className="App">
      <Navb userLogon = {userLogon} setUserLogon={setUserLogon}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp setUserLogon={setUserLogon}/>}/>
          <Route path="/signin" element={<LogIn setUserLogon={setUserLogon}/>}/>
          <Route path="/user/:id" element={<UserDetails/>}/>
        </Routes>
    </div>
  );
}

export default App;
