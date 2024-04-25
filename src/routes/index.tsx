import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Register from "../pages/Register";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "../providers/AuthProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "../pages/Contact";
import Models from "../pages/Models";
import ModelDetails from "../pages/Models/ModelDetails";
import { Stack } from "@mui/material";
import ModelProfile from "../pages/Models/ModelProfile";
import Advertise from "../pages/Advertise";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider isSignedIn={true}>
        <Header />
        <Stack my={10}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/models" element={<Models />} />
            <Route path="/models/:name" element={<ModelProfile name="" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Stack>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
