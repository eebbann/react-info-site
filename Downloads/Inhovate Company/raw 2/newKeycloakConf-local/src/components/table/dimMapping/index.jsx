import React, { useRef, useEffect, useState, useCallback } from "react";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { GridExporter } from "@devexpress/dx-react-grid-export";
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
  ExportPanel,
  TableColumnResizing,
} from "@devexpress/dx-react-grid-material-ui";
import { useParams } from "react-router-dom";
import "../table.css";
import BulkEdit from "./bulkEdit";
import {
  CurrencyEditor,
  FilterIcon,
  Command,
  RestoredCommand,
} from "../shared";
import { EditCell } from "./editCell";
import axios from "axios";
import { get_selections } from "../../..//store/dimMapping";
import { useDispatch } from "react-redux";
import { fetch_dim_data } from "../../../store/api/dimMapping";
import saveAs from "file-saver";

const getRowId = (row) => row.id;

export default function I({
  columns,
  data,
  propertyId,
  propertyCode,
  tableType,
}) {
  const [selection, setSelection] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();

  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 50, 100]);
  const exporterRef = useRef(null);
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
  const columWidth = columns.map((column) => ({
    columnName: column.name,
    width: 200,
  }));
  const [defaultColumnWidths] = useState(columWidth);

  const [editingStateColumnExtensions] = useState([
    { columnName: "is_transaction", editingEnabled: false },
    { columnName: "inHovate code", editingEnabled: false },
    { columnName: "parent inHovate code", editingEnabled: false },
  ]);
  useEffect(() => {
    setRows(data);
  }, [data]);

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
  const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        "inHovate_data.xlsx"
      );
    });
  };
  const [columnOrder, setColumnOrder] = useState([]);
  const [leftColumns] = useState([TableEditColumn.COLUMN_TYPE]);

  const commitChanges = async ({ added, changed, deleted }) => {
    try {
      let changedRows;

      //handle added new row
      if (added) {
        const data = added[0];
        const payload = {
          id: 0,
          code: data?.code ? data?.code : "",
          description: data?.description ? data?.description : "",
          parentCode: data["parent code & description"]?.split("-")[0]
            ? data["parent code & description"]?.split("-")[0]
            : "",
          subAccountCode: data["sub account code"],
          subAccountDescription: data["sub account desc"],
          codeStatus: data["code status"],
          propertyId: propertyId,
          propertyCode: propertyCode,
          data: { ...data },
          statusMessage: "add request",
        };

        await axios
          .post(`/api/property/data/coa/${propertyId}`, payload, {
            headers: { "content-type": "application/json" },
          })
          .then((response) => {
            if (response.data["statusMessage"] !== "SUCCESS") {
              toast.error(response.data["statusMessage"]);
            } else {
              toast("Data added successfully");
              fetch_dim_data(params, dispatch);
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });

        changedRows = [...rows];
      }
      //handle edit row
      if (changed) {
        const data = changed[Object.keys(changed)[0]];
        const id = Object.keys(changed)[0];
        let tempArray = { ...data };
        console.log("tempArray is", tempArray);
        const re = {
          propertyId: propertyId,
          propertyCode: propertyCode,
          id,
          data: { ...data },
          statusMessage: "request",
        };

        await axios
          .put(`/api/property/data/coa/${propertyId}/${id}`, re, {
            headers: { "content-type": "application/json" },
          })
          .then((response) => {
            if (response.data["statusMessage"] !== "SUCCESS") {
              toast.error(response.data["statusMessage"]);
            } else {
              toast("Successfully edited");
              changedRows = rows.map((row) =>
                changed[row.id] ? { ...row, ...changed[row.id] } : row
              );
              setRows(changedRows);
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }

      //handle deleted row
      if (deleted) {
        const id = deleted[0];
        const payload = {
          propertyId: propertyId,
          propertyCode: propertyCode,
          attributeName: "deletion status",
          attributeValue: tableType === "delete" ? "false" : "true",
          ids: [id],
          statusMessage: "Test",
        };

        await axios
          .put(
            `/api/property/data/coa/${propertyId}/attribute`,
            payload,

            {
              headers: { "content-type": "application/json" },
            }
          )
          .then((response) => {
            if (response.data["statusMessage"] !== "SUCCESS") {
              toast.error(response.data["statusMessage"]);
            } else {
              if (tableType === "delete") {
                toast("Row restored successfully!");
              } else {
                toast("Row deleted successfully!");
              }
              fetch_dim_data(params, dispatch);
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //export function

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  return (
    <Paper>
      <div className="bulk_sel">
        <BulkEdit />
        <p className="selectedRow">
          Selected rows{" "}
          <span className="span_select">( {selection.length} )</span>{" "}
        </p>
      </div>
      <ToastContainer theme="dark" />
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <EditingState
          onCommitChanges={commitChanges}
          columnExtensions={editingStateColumnExtensions}
        />

        <SearchState />
        <SortingState />
        <DragDropProvider />
        <GroupingState />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <PagingState
          defaultCurrentPage={0}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <FilteringState />

        <DataTypeProvider
          for={dateColumns}
          availableFilterOperations={dateFilterOperations}
        />
        <DataTypeProvider
          for={currencyColumns}
          availableFilterOperations={currencyFilterOperations}
          editorComponent={CurrencyEditor}
        />
        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
        <IntegratedSelection />
        <IntegratedGrouping />
        <IntegratedSorting />
        <IntegratedPaging />
        <Table />
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableColumnVisibility
          defaultHiddenColumnNames={defaultHiddenColumnNames}
        />
        <DragDropProvider />
        <TableColumnReordering
          order={columnOrder}
          onOrderChange={setColumnOrder}
        />
        <TableHeaderRow showSortingControls />
        <TableSelection showSelectAll />
        <TableFilterRow
          showFilterSelector
          iconComponent={FilterIcon}
          messages={{ month: "Month equals" }}
        />
        <TableGroupRow />
        <Toolbar />

        <GroupingPanel />
        <ColumnChooser />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
          commandComponent={tableType === "delete" ? RestoredCommand : Command}
        />

        <TableEditRow
          cellComponent={(cellProps) => <EditCell {...cellProps} />}
        />
        <TableFixedColumns leftColumns={leftColumns} />

        <SearchPanel />
        <PagingPanel pageSizes={pageSizes} />
        <ExportPanel startExport={startExport} />
      </Grid>
      <GridExporter
        ref={exporterRef}
        rows={rows}
        columns={columns}
        onSave={onSave}
      />
    </Paper>
  );
}
