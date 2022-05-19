import React, { useState, useEffect } from "react";
import logoPng from "./logo-inhovate-64abd6.png";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuItem,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";


export default function NavBar({keycloakObj}) {
  
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useNavigate();

  const isMenuOpen = Boolean(anchorEl);

  const username = sessionStorage.getItem("inhovate-username")
  const secondUsername = sessionStorage.getItem("inhovate-usernameTwo")


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const pushToLandingPage = () => {
    setTimeout(() => {
      history("/")
    }, 600);
  }

  const handleLogout = () => {
    sessionStorage.removeItem("inhovate-token");
    sessionStorage.removeItem("inhovate-username");
    sessionStorage.removeItem("inhovate-user");
    keycloakObj?.logout()
    pushToLandingPage()
  }

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {handleMenuClose();handleLogout()}}>Logout</MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: "#64abd6", 
			boxShadow: "none",
		}}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <a href="/">
              {" "}
              <img src={logoPng} alt="logo" />{" "}
            </a>
          </Box>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            ></IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            ></IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <p style={{marginLeft: "5px"}}>{secondUsername}</p>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}