import React, { useState } from "react"; 
import { Button } from "./tab_style";
import {TabStyled} from "./tab_style"; 
import {Div} from "./tab_style";


export function Tab({ getValue }) {
  const [value, setvalue] = useState("department");
  const handleChange = (v) => {
    setvalue(v);
    getValue(v);
  };
  return (
    <TabStyled className="tabs">
      <Button
        onClick={() => handleChange("department")}
        active={value === "department"}
      >
        Department
      </Button>
      <Button
        onClick={() => handleChange("meal-period")}
        active={value === "meal-period"}
      >
        Meal Period
      </Button>
      <Button
        onClick={() => handleChange("marketing-segment")}
        active={value === "marketing-segment"}
      >
        Marketing Segment
      </Button>
      <Button
        onClick={() => handleChange("sub-account")}
        active={value === "sub-account"}
      >
        Sub Account
      </Button>
    </TabStyled>
  );
}

export function TabPanel({ value, tabValue, children }) {
  //return tavb pannel with style 
	return (
		<Div
		  className="tab-panel"
			role="tabpanel"
			hidden={value !== tabValue}
			id={`simple-tabpanel-${tabValue}`}
			aria-labelledby={`simple-tab-${tabValue}`}
		>
			{children}
		</Div>
	);
}

