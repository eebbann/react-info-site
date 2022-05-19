import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Home from "./pages/home";
import TableGrid from "./pages/dimmapping";
import Navbar from "./components/Navbar/appBar";
import MappingUtility from "./pages/mapping";
import keycloak from "./config/Keycloak";
import LandingPage from "./pages/LandingPage";
import NoRoute from "./helpers/NoRoute";

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
          <>
          <LandingPage />
          </>
          } />
          <Route path="/home" element={
          <>
            <Navbar />
            <Home />
          </>
          } />
          <Route
            path="/dim/:propertyCode/:propertyMasterCode"
            element={
            <>
              <Navbar />
              <TableGrid />
            </>
            }
          />
          <Route
            path="/map/:propertyCode/:propertyMasterCode"
            element={
            <>
            <Navbar />
            <MappingUtility />
            </>
            }
          />
          <Route path="*" element={<NoRoute />} />
        </Routes>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default App;
