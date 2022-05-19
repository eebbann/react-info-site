import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Table from "../../components/table/dimMapping";
import Header from "../../components/table/dimMapping/header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { is_loading } from "../../store/dimMapping";
import { fetch_dim_data } from "../../store/api/dimMapping";
import DimLayout from "../../layouts/dim";
import Dimension from "./demension";
import DefaultTable from "../../components/table/table";

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
    selections,
  } = useSelector((state) => state.dimMappingReducer);

  const [onlyActiveData, setOnlyActiveData] = useState(true);

  useEffect(() => {
    dispatch(is_loading());
    fetch_dim_data(params, dispatch);
  }, [dispatch, params]);

  return (
    <DimLayout loading={loading}>
      {params.propertyMasterCode === "Dimensions" ? (
        <DefaultTable
          columns={headers.filter(
            (header) => header.name !== "identify dimension"
          )}
          commitChanges={() => null}
          data={active_rows}
          defaultHiddenColumnNames={[]}
          editingStateColumnExtensions={[]}
          tableType={""}
        />
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
    </DimLayout>
  );
}

export default TableGrid;
