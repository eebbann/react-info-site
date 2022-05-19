import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://authametist.ibts.inhovate.com/auth",
  realm: "inhovate",
  clientId: "mapping_gui",
  onLoad: "login-required",
});

export default keycloak;
