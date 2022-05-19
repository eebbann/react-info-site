import React, { useEffect } from "react";
import { Box } from "@mui/material";
import UploadTable from "../components/table/summary";
import Form from "../components/form/form";
import { useNavigate } from "react-router-dom";

function Example() {
	const history = useNavigate();

  const userToken = sessionStorage.getItem("user-token")

  useEffect(() => {
    if (!userToken) {
      history("/");
    }
  }, []);

  return (
    <Box>
      <Form />
      <UploadTable />
    </Box>
  );
}

export default Example;
