import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import keycloak from "../config/Keycloak";
import { fetch_map_data } from "../store/api/mapping";
import { is_loading } from "../store/mapping";
import TableUtility from "../components/table/mapping";
import MapUtiHeader from "../components/table/mapping/header";
import Loading from "../components/shared/loading";

const MappingUtility = () => {
  const {
    rows,
    headers,
    propertyId,
    propertyCode,
    loading,
    propertyMasterCode,
    propertyMasterId,
  } = useSelector((state) => state.mappingReducer);
  const columnsFormapping = [];

  const params = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();

  const [reload,setReload] = useState(false)

  const userToken = sessionStorage.getItem("user-token")

  useEffect(() => {
    if (!userToken) {
      history("/");
    }
    dispatch(is_loading());
    fetch_map_data(params, dispatch);
  }, [reload]);

  return (
    <Box sx={{ marginTop: "70px" }}>
      {loading ? (
        <div className="loading">
          <Loading />
        </div>
      ) : (
        <Box sm={{ minWidth: "100%" }}>
          <MapUtiHeader />
          <TableUtility
            columns={headers}
            data={rows}
            propertyId={propertyId}
            propertyCode={propertyCode}
            propertyMasterId={propertyMasterId}
            propertyMasterCode={propertyMasterCode}
            mappingCol={columnsFormapping}
            setReload={setReload}
          />
        </Box>
      )}
    </Box>
  );
};

export default MappingUtility;
