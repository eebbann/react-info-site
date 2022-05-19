import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../table.css";
import {
  SortingState,
  IntegratedSorting,
  EditingState,
  FilteringState,
  IntegratedFiltering,
  DataTypeProvider,
  SearchState,
  GroupingState,
  IntegratedGrouping,
  PagingState,
  IntegratedPaging,
  SelectionState,
  IntegratedSelection,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  TableHeaderRow,
  TableEditColumn,
  TableFilterRow,
  Table,
  TableColumnVisibility,
  Toolbar,
  ColumnChooser,
  SearchPanel,
  TableGroupRow,
  GroupingPanel,
  DragDropProvider,
  PagingPanel,
  TableFixedColumns,
  TableColumnReordering,
  TableEditRow,
  TableSelection,
  TableColumnResizing,
} from "@devexpress/dx-react-grid-material-ui";
import "../table.css";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { update_map_data } from "../../../store/api/mapping";
import { get_selections } from "../../../store/mapping";
import { CurrencyEditor, FilterIcon, Command } from "../shared";
import { EditCell } from "./editCell";
import BulkEdit from "./bulkEdit";

const getRowId = (row) => row.id;

export default function TableUtility({
  columns,
  data,
  propertyId,
  propertyMasterCode,
  setReload
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([100, 50, 10]);
  const [selection, setSelection] = useState([]);

  const [rows, setRows] = useState([]);
  const [defaultHiddenColumnNames] = useState([
    "a2",
    "a3",
    "status",
    "lookup code",
    "account type",
    "sub account code",
    "sub account desc",
    "deletion status",
    "parent deletion status",
    "code status",
    "class. desc.",
  ]);
  const dispatch = useDispatch();
  const params = useParams();
  const { perpertives } = useSelector((state) => state.mappingReducer);

  const columWidth = columns.map((column) => ({
    columnName: column.name,
    width: 180,
  }));
  const [defaultColumnWidths, setDefaultColumnWidths] = useState(columWidth);

  useEffect(() => {
    setRows(data);
  }, [data]);
  useEffect(() => {
    const columWidth = columns.map((column) => ({
      columnName: column.name,
      width: 180,
    }));
    setDefaultColumnWidths(columWidth);
  }, [columns]);

  useEffect(() => {
    dispatch(get_selections(selection));
  }, [selection]);

  const [dateColumns] = useState(["saleDate"]);
  const [dateFilterOperations] = useState([
    "month",
    "contains",
    "startsWith",
    "endsWith",
  ]);

  const [currencyColumns] = useState(["amount"]);
  const [currencyFilterOperations] = useState([
    "equal",
    "notEqual",
    "greaterThan",
    "greaterThanOrEqual",
    "lessThan",
    "lessThanOrEqual",
  ]);

  const [filteringColumnExtensions] = useState([
    {
      columnName: "saleDate",
      predicate: (value, filter, row) => {
        if (!filter.value.length) return true;
        if (filter && filter.operation === "month") {
          const month = parseInt(value.split("-")[1], 10);
          return month === parseInt(filter.value, 10);
        }
        return IntegratedFiltering.defaultPredicate(value, filter, row);
      },
    },
  ]);

  const [columnOrder, setColumnOrder] = useState([]);
  const [leftColumns] = useState([TableEditColumn.COLUMN_TYPE]);

  const commitChanges = ({ changed }) => {
    // let changedRows;

    if (changed) {
      update_map_data(
        changed,
        perpertives,
        rows,
        propertyId,
        propertyMasterCode,
        dispatch,
        params
      );
    }
  };

  return (
    <>
      <Paper
        style={{ width: "100vw", marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="select_container">
          <BulkEdit setReload={setReload}/>
          <p className="selectedRow">
            Selected rows{" "}
            <span className="span_select">( {selection.length} )</span>{" "}
          </p>
        </div>
        <ToastContainer theme="dark" />
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <EditingState onCommitChanges={commitChanges} />
          <SearchState />
          <SortingState />
          <SelectionState
            selection={selection}
            onSelectionChange={setSelection}
          />
          <DragDropProvider />
          <GroupingState />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />

          <DataTypeProvider
            for={dateColumns}
            availableFilterOperations={dateFilterOperations}
          />
          <DataTypeProvider
            for={currencyColumns}
            availableFilterOperations={currencyFilterOperations}
            editorComponent={CurrencyEditor}
          />

          <IntegratedSorting />
          <FilteringState />
          <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
          <IntegratedGrouping />
          <IntegratedSelection />
          <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
          <IntegratedPaging />

          <Table />
          <TableColumnResizing
            defaultColumnWidths={defaultColumnWidths}
            onColumnWidthsChange={setDefaultColumnWidths}
            resizingMode="nextColumn"
          />

          <TableColumnVisibility
            defaultHiddenColumnNames={defaultHiddenColumnNames}
          />

          <DragDropProvider />

          <TableColumnReordering
            order={columnOrder}
            onOrderChange={setColumnOrder}
          />

          <TableHeaderRow showSortingControls />

          <TableFilterRow
            showFilterSelector
            iconComponent={FilterIcon}
            messages={{ month: "Month equals" }}
          />
          <TableSelection showSelectAll />
          <TableGroupRow />
          <Toolbar />
          <GroupingPanel />
          <ColumnChooser />

          <TableEditColumn showEditCommand commandComponent={Command} />
          <TableEditRow
            cellComponent={(cellProps) => <EditCell {...cellProps} />}
          />

          <TableFixedColumns leftColumns={leftColumns} />
          <SearchPanel />
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
      </Paper>
    </>
  );
}
