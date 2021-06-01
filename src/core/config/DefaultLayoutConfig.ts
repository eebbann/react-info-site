import LayoutConfigTypes from "@/core/config/LayoutConfigTypes";

const config: LayoutConfigTypes = {
  webName: "nitto",
  webVersion: "0",
   
  main: {
    type: "default",
    primaryColor: "#009EF7",
    logo: {
      dark: "media/logos/logo-1-dark.svg",
      light: "media/logos/logo-1-dark.svg"
    }
  },
  loader: {
    logo: "media/logos/logo-1-dark.svg",
    display: true,
    type: "default"
  },
  scrollTop: {
    display: true
  },
  header: {
    display: true,
    width: "fluid",
    fixed: {
      desktop: true,
      tabletAndMobile: true
    }
  },
  toolbar: {
    display: true,
    width: "fluid",
    fixed: {
      desktop: true,
      tabletAndMobile: true
    }
  },
  aside: {
    display: true,
    theme: "dark",
    fixed: true,
    menuIcon: "svg",
    minimized: false,
    minimize: true,
    hoverable: true
  },
  content: {
    width: "fixed"
  },
  footer: {
    width: "fluid"
  }
};

export default config;
