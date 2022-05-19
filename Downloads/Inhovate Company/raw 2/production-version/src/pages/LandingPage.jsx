import React, { useState, useEffect } from "react";
import "../styles/landingPage.css";
import keycloak from "../config/Keycloak";
import { useNavigate } from "react-router-dom";
import bg from "../assets/front_page.jpg";
import logo from "../assets/logo_in.png";
import hot1 from "../assets/hot1.png";
import hot2 from "../assets/hot2.png";
import hot3 from "../assets/hot3.png";
import hot4 from "../assets/hot4.png";
import hot5 from "../assets/hot5.png";
import LoadingScreen from "../helpers/LoadingScreen";

const LandingPage = () => {
  const [loaded, setLoaded] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, []);

  const userToken = sessionStorage.getItem("user-token")

  useEffect(() => {
    if (userToken) {
      history("/home");
    } else if (keycloak.authenticated) {
      sessionStorage.setItem("user-token", keycloak?.token);
      sessionStorage.setItem("user-name", keycloak?.tokenParsed?.preferred_username)
      sessionStorage.setItem("user-roles", keycloak?.tokenParsed.realm_access.roles)
      history("/home");
    } else {
      sessionStorage.removeItem("user-token");
      sessionStorage.removeItem("user-name")
      sessionStorage.removeItem("user-roles")
    }
    checkIfAuthAndRedirect();
  }, [keycloak]);

  const checkIfAuthAndRedirect = () => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        if (userToken) {
          history("/home");
        } else if (keycloak.authenticated) {
          sessionStorage.setItem("user-token", keycloak?.token);
          sessionStorage.setItem("user-name", keycloak?.tokenParsed?.preferred_username)
          sessionStorage.setItem("user-roles", keycloak?.tokenParsed.realm_access.roles)
          history("/home");
        } else {
          sessionStorage.removeItem("user-token");
          sessionStorage.removeItem("user-name")
          sessionStorage.removeItem("user-roles")
        }
      }, 500);
    }
  };

  return (
    <>
      {loaded ? (
        <div className="front_page">
          <div className="inhovate_wrap">
            {/* bg  */}
            <img className="img_fit" src={bg} alt="bg" />
          </div>
          <div className="frt_fnt">
            <div className="logo_wrap">
              <img className="logo_img" src={logo} alt="logo" />
            </div>
            {/*/ title */}
            <div className="title_wrap">
              <p className="frs">BEYOND BUSINESS INTELLIGENCE</p>
              <p className="sec">Welcome to inHovate Mapping Utility</p>
            </div>
            {/*/ button */}
            <div className="btn_wrap">
              <button
                className="btn_fnt"
                onClick={() => {
                  if (!userToken) {
                    keycloak?.login();
                    checkIfAuthAndRedirect();
                  } else {
                    history("home")
                  }
                }}
              >
                <small>Enter</small>
              </button>
            </div>

            <div className="trusted-by">
              <small>TRUSTED BY:</small>
            </div>

            <div className="trusted-wrap">
              <div className="trusted">
                <img src={hot1} alt="Trusted Customers" />
                <img src={hot2} alt="Trusted Customers" />
                <img src={hot3} alt="Trusted Customers" />
                <img src={hot4} alt="Trusted Customers" />
                <img src={hot5} alt="Trusted Customers" />
              </div>
            </div>
          </div>
          <footer className="footer">
            <p> © 2022 inHovate Solutions Ltd</p>
          </footer>
        </div>
      ) : (
        <div className="front_page">
          <LoadingScreen />
        </div>
      )}
    </>
  );
};

export default LandingPage;
