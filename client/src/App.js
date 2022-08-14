import Navb from "./Components/NavBar";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navb/>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<LogIn/>}/>
        </Routes>
    </div>
  );
}

export default App;
