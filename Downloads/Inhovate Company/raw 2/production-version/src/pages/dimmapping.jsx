import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Table from "../components/table/dimMapping";
import Header from "../components/table/dimMapping/header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { is_loading } from "../store/dimMapping";
import { fetch_dim_data } from "../store/api/dimMapping";
import keycloak from "../config/Keycloak";
import Loading from "../components/shared/loading";

function TableGrid() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useNavigate();
  const {
    active_rows,
    deleted_rows,
    headers,
    propertyId,
    propertyCode,
    loading,
  } = useSelector((state) => state.dimMappingReducer);

  const [onlyActiveData, setOnlyActiveData] = useState(true);

  const userToken = sessionStorage.getItem("user-token")

  useEffect(() => {
    if (!userToken) {
      history("/");
    }
    dispatch(is_loading());
    fetch_dim_data(params, dispatch);
  }, []);

  return (
    <Box sx={{ marginTop: "70px" }}>
      {loading ? (
        <div className="loading">
          <Loading />
        </div>
      ) : (
        <Box sm={{ minWidth: "100%" }}>
          <Header
            button={
              <Button
                className="toggle"
                onClick={() => setOnlyActiveData(!onlyActiveData)}
              >
                {onlyActiveData ? "Show Deleted" : "Show ALL data"}
              </Button>
            }
          />

          <Table
            columns={headers}
            tableType={onlyActiveData ? "active" : "delete"}
            data={onlyActiveData ? active_rows : deleted_rows}
            propertyId={propertyId}
            propertyCode={propertyCode}
          />
        </Box>
      )}
    </Box>
  );
}

export default TableGrid;
