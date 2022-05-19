import React, { useState } from "react";
import logoPng from "./logo-inhovate-64abd6.png";
import { Link } from "react-router-dom";
import keycloak from "../../config/Keycloak";
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


export default function NavBar() {

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const username = sessionStorage.getItem("user-name")

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
    keycloak?.logout()
    sessionStorage.removeItem("user-token");
    sessionStorage.removeItem("user-name");
    sessionStorage.removeItem("user-roles");
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
      <AppBar position="fixed" sx={{ background: "#64abd6" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/">
              {" "}
              <img src={logoPng} alt="logo" />{" "}
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            ></IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            ></IconButton>
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
          <p style={{marginLeft: "5px"}}>{username}</p>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}