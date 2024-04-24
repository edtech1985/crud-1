import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Girls from "../pages/Models/Girls";
import Register from "../pages/Register";
import Admin from "../pages/Admin";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/models" element={<Girls />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/admin" element={<Admin /> } /> */}
      </Routes>
    </Router>
  );
}
