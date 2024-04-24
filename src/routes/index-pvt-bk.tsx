import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Girls from "../pages/Models/Girls";
import Register from "../pages/Register";
import Admin from "../pages/Admin";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/Login";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/models" element={<Girls />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}
