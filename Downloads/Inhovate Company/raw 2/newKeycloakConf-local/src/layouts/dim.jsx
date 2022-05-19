import { Box } from "@mui/material";
import React from "react";
import NavBar from "../components/Navbar/appBar";
import Loading from "../components/shared/loading";
import LoadingScreen from "../helpers/LoadingScreen";

function DimLayout({ children, loading }) {
  return (
    <div>
      <NavBar />
      <Box sx={{ marginTop: "70px" }}>
        {loading ? (
          <div className="loading">
            {/* <Loading /> */}
            <LoadingScreen />
          </div>
        ) : (
          children
        )}
      </Box>
    </div>
  );
}

export default DimLayout;
