import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import TableGrid from "./pages/dimmapping";
import Navbar from "./components/Navbar/appBar";
import MappingUtility from "./pages/mapping";
import NoRoute from "./helpers/NoRoute";

function AppContent({ keycloakObj }) {

  return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar keycloakObj={keycloakObj}/>
                <Home />
              </>
            }
          />
          <Route
            path="/dim/:propertyCode/:propertyMasterCode"
            element={
              <>
                <Navbar keycloakObj={keycloakObj}/>
                <TableGrid />
              </>
            }
          />
          <Route
            path="/map/:propertyCode/:propertyMasterCode"
            element={
              <>
                <Navbar keycloakObj={keycloakObj}/>
                <MappingUtility />
              </>
            }
          />
          <Route path="*" element={<NoRoute />} />
        </Routes>
      </BrowserRouter>
  );
}

export default AppContent;
