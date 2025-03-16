import "./App.css";
import Login from "./Components/Login.jsx";
import Home from "./Components/Home.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import Test from "./Components/Test.jsx"
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path= "/" element= {<Home/>}/>
        <Route path= "login" element= {<Login/>}/>
        <Route path= "dashboard" element= {<Dashboard/>}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
