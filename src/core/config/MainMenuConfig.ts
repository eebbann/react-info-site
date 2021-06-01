const DocMenuConfig: object = [
  {
    pages: [
      {
        heading: "",
        route: "/"
      }
    ]
  },
  {
    pages: [
      {
        sectionTitle: "STYLE GUIDE",
        route: "/style",
        svgIcon: "media/icons/duotone/Design/Branding.svg",
        sub: [
          {
            heading: "Nitto Logo",
            route: "/logo"
          },
          {
            heading: "Dealer Brochure",
            route: "/crafted/"
          },
          {
            heading: "Consumer Brochure",
            route: "/crafted/"
          }
        ]
      },
      {
        sectionTitle: "LIGHT TRUCK",
        route: "/lightTruck",
        svgIcon: "media/icons/duotone/Design/LightTruck.svg",
        sub: [
          {
            heading: "Ridge Grappler",
            route: "/grapler"
          },
          {
            heading: "Recon Grappler",
            route: "/recon"
          },
          {
            heading: "Mud Grappler",
            route: "/mud grappler"
          },
          {
            heading: "Terra Grappler",
            route: "/terra-grappler"
          },
          {
            heading: "Terra Grappler G2",
            route: "/terra-grappler-g2"
          },
          {
            heading: "Trail Grappler",
            route: "/trail-grappler"
          },
          {
            heading: "Exo Grappler",
            route: "/exo-grappler"
          },
          {
            heading: "Dura Grappler",
            route: "/dura-grapppler"
          }
        ]
      },
      {
        sectionTitle: "PASSENGER",
        svgIcon: "media/icons/duotone/Design/Passenger.svg",

        sub: [
          {
            heading: "Link",
            route: "/link"
          },
          {
            heading: "Link",
            route: "/link"
          }
        ]
      },
      {
        sectionTitle: "COMPETITION",
        svgIcon: "media/icons/duotone/Design/Competition.svg",
        
        sub: [
        {
            heading: "link",
            route: "/"
          },
          {
            heading: "link",
            route: "/"
          }
        ]
      },
      {
        sectionTitle: "SXS",
        svgIcon: "media/icons/duotone/Design/Passenger.svg",
        fontIcon: "bi-sticky",
        sub: [
          {
            heading: "link",
            route: "/3"
          },
          {
            heading: "link",
            route: "/2"
          }
        ]
      }
    ]
  }
];
export default DocMenuConfig;
