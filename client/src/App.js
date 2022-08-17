import Navb from "./Components/NavBar";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
//import Transaction from "./Components/Transaction";
import UserDetails from "./Components/userDetails";
function App() {
  return (
    <div className="App">
      <Navb/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<LogIn/>}/>
          <Route path="/user/:id" element={<UserDetails/>}/>
        </Routes>
    </div>
  );
}

export default App;
