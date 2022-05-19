import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetch_map_data } from "../store/api/mapping";
import { is_loading } from "../store/mapping";
import TableUtility from "../components/table/mapping";
import MapUtiHeader from "../components/table/mapping/header";
// import Loading from "../components/shared/loading";
import LoadingScreen from "../helpers/LoadingScreen";

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

  const params = useParams();
  const dispatch = useDispatch();

  const [reload, setReload] = useState(false)

  useEffect(() => {
    dispatch(is_loading());
    fetch_map_data(params, dispatch);
  }, [reload]);

  return (
    <Box sx={{ marginTop: "70px" }}>
      {loading ? (
        <div className="loading">
          {/* <Loading /> */}
          <LoadingScreen />
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
            setReload={setReload}
          />
        </Box>
      )}
    </Box>
  );
};

export default MappingUtility;
