import React, { useRef, useEffect, useState, useCallback } from "react";
import Paper from "@mui/material/Paper";
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
import "./table.css";
import { CurrencyEditor, FilterIcon, Command, RestoredCommand } from "./shared";
import saveAs from "file-saver";

const getRowId = (row) => row.id;

export default function Tab({
  columns,
  data,
  tableType,
  commitChanges,
  defaultHiddenColumnNames,
  getSelectedRow,
  editingStateColumnExtensions,
}) {
  const [selection, setSelection] = useState([]);

  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 50, 100]);
  const exporterRef = useRef(null);

  const columWidth = columns.map((column) => ({
    columnName: column.name,
    width: 200,
  }));
  const [defaultColumnWidths] = useState(columWidth);

  useEffect(() => {
    setRows(data);
  }, [data]);

  useEffect(() => {
    getSelectedRow && getSelectedRow(selection);
  }, [selection, getSelectedRow]);

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

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  return (
    <Paper>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <EditingState
          onRowChangesChange={() => false}
          onEditingCellsChange={() => alert("hh")}
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
        <IntegratedSelection />
        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
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
          commandComponent={(props) =>
            tableType === "delete" ? RestoredCommand(props) : Command(props)
          }
        />

        <TableEditRow />
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
