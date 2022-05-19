import React, { useEffect, useState } from "react";
import { Tab, TabPanel } from "../../../components/shared/tab";
import data from "../../../helpers/data.json";
import DefaultTable from "../../../components/table/table";
import { Box } from "@mui/material";
import { useRequestHook } from "./dimension-request";

function Dimension() {
  const [tabValue, setTabValue] = useState("department");
  const demoHeaders = [
    {
      name: "code1",
      title: "Code",
    },
    {
      name: "code2",
      title: "Parent Code",
    },
    {
      name: "code4",
      title: "Transction Pin",
    },
    {
      name: "code5",
      title: "MappingCode",
    },
    {
      name: "code5",
      title: "Detail OOP",
    },
    {
      name: "code6",
      title: "Account No",
    },
    {
      name: "code7",
      title: "Transction Key",
    },
  ];
  const [demoRows, setDemoRows] = useState(data);
  const { getDimensionData } = useRequestHook();

  useEffect(() => {
    getDimensionData()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getDimensionData]);

  return (
    <Box sm={{ minWidth: "100%" }}>
      <Tab
        getValue={(value) => {
          setTabValue(value);
          setDemoRows(data.reverse());
        }}
      />

      <TabPanel value="department" tabValue={tabValue}>
        <h1>{tabValue}</h1>
        <DefaultTable
          columns={demoHeaders}
          data={demoRows}
          commitChanges={(data) => console.log(data)}
        />
      </TabPanel>
      <TabPanel value="meal-period" tabValue={tabValue}>
        <h1>{tabValue}</h1>
        <DefaultTable
          columns={demoHeaders}
          data={demoRows}
          commitChanges={(data) => console.log(data)}
        />
      </TabPanel>

      <TabPanel value="marketing-segment" tabValue={tabValue}>
        <h1>{tabValue}</h1>
        <DefaultTable
          columns={demoHeaders}
          data={demoRows}
          commitChanges={(data) => console.log(data)}
        />
      </TabPanel>

      <TabPanel value="sub-account" tabValue={tabValue}>
        <h1>{tabValue}</h1>
        <DefaultTable
          columns={demoHeaders}
          data={demoRows}
          commitChanges={(data) => console.log(data)}
        />
      </TabPanel>
    </Box>
  );
}

export default Dimension;
