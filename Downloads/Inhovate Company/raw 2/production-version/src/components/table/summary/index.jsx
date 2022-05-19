import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { EditingState } from "@devexpress/dx-react-grid";
import { Button } from "@mui/material";
import "./UploadTable.css";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  TableInlineCellEditing,
} from "@devexpress/dx-react-grid-material-ui";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetch_summary_data } from "../../../store/api/summary";

const getRowId = (row) => row.id;

function UploadTable() {
  const [columns] = useState([
    { name: "propertyName", title: "Property" },
    { name: "masterName", title: "Dimension" },
    { name: "actions", title: "Action" },
  ]);
  const { rows } = useSelector((state) => state.summaryReducer);
  const dispatch = useDispatch();

  //add action column
  useEffect(() => {
    fetch_summary_data(dispatch);
  }, []);

  const ActionCell = ({ row, column, value }) =>
    column.name === "actions" ? (
      <div div className="rowContainer">
        <Button variant="contained" color="primary" className="link_btn">
          <Link
            className="link_clrd"
            to={`/dim/${row.propertyCode}/${row.masterCode}`}
          >
            Dim Mapping
          </Link>
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={row.inHovateCodeGenerated ? "link_btn2" : ""}
          disabled={!row.inHovateCodeGenerated}
        >
          <Link
            className="link_clrd"
            to={`/map/${row.propertyCode}/${row.masterCode}`}
          >
            Mapping
          </Link>
        </Button>
      </div>
    ) : (
      <Table.Cell row={row} column={column} value={value} />
    );

  const [editingStateColumnExtensions] = useState([
    {
      columnName: "Property",
      editingEnabled: false,
      width: 200,
      align: "left",
    },
    { columnName: "Master", editingEnabled: false, width: 140, align: "left" },
    { columnName: "actions", editingEnabled: false, width: 200, align: "left" },
  ]);

  return (
    <Paper className="table">
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <EditingState />
        <Table cellComponent={ActionCell} />
        <TableHeaderRow />
        <TableInlineCellEditing
          selectTextOnEditStart
          editingStateColumnExtensions={editingStateColumnExtensions}
        />
        <TableEditColumn />
      </Grid>
    </Paper>
  );
}

export default UploadTable;
