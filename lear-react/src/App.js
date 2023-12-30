import Dashboard from "./component/Dashboard.js";
import Login from "./component/login.js";
import Navbar from "./component/Navbar.js";
import Register from "./component/Register.js";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<div><Navbar /> <Dashboard /></div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
