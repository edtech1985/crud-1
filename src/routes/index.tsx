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
import { Stack } from "@mui/material";
import ModelProfile from "../pages/Models/ModelProfile";
import Advertise from "../pages/Advertise";
import Favorites from "../pages/Favorites";
import Terms from "../pages/Terms";
import ScrollToTop from "../components/ScrollToTop";
import Cities from "../pages/Cities";
import Massage from "../pages/Massage";
import MassageHouseProfile from "../pages/MassageHouseProfile";
import MassageHouses from "../db/massagesHouse.json";
import { CityProvider } from "../context/CityContext";
import PrivacyPolicy from "../pages/PrivacyPolicy";


export default function AppRouter() {
  return (
    <CityProvider>
      <BrowserRouter>
        <AuthProvider isSignedIn={true}>
          <Header />
          <div id="back-to-top-anchor" />
          <Stack my={10}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/acompanhantes" element={<Models />} />
              <Route
                path="/acompanhantes/:name"
                element={<ModelProfile name="" />}
              />
              <Route path="/cidades/:cityURL" element={<Cities />} />
              <Route path="/casas-de-massagem" element={<Massage />} />
              <Route
                path="/casas-de-massagem/:state/:city/:id/:profileName"
                element={<MassageHouseProfile massageHouses={MassageHouses} />}
              />
              <Route path="/contato" element={<Contact />} />
              <Route path="/anuncie" element={<Advertise />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/favoritos" element={<Favorites />} />
              <Route path="/termos-de-uso" element={<Terms />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
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
          <ScrollToTop />
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </CityProvider>
  );
}
