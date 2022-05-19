import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { TableFilterRow } from "@devexpress/dx-react-grid-material-ui";
import { styled, IconButton, Button } from "@mui/material";
import Input from "@mui/material/Input";
import DateRange from "@mui/icons-material/DateRange";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import AlertDialog from "../shared/modal";
import RestoreIcon from "@mui/icons-material/Restore";

export const FilterIcon = ({ type, ...restProps }) => {
  if (type === "month") return <DateRange {...restProps} />;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

const PREFIX = "Demo";
const classes = {
  root: `${PREFIX}-root`,
  numericInput: `${PREFIX}-numericInput`,
};
const StyledInput = styled(Input)(({ theme }) => ({
  [`&.${classes.root}`]: {
    margin: theme.spacing(1),
  },
  [`& .${classes.numericInput}`]: {
    fontSize: "14px",
    textAlign: "right",
    width: "100%",
  },
}));

export const CurrencyEditor = ({ value, onValueChange }) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === "") {
      onValueChange();
      return;
    }
    onValueChange(parseInt(targetValue, 10));
  };
  return (
    <StyledInput
      type="number"
      classes={{
        input: classes.numericInput,
        root: classes.root,
      }}
      fullWidth
      value={value === undefined ? "" : value}
      inputProps={{
        min: 0,
        placeholder: "Filter...",
      }}
      onChange={handleChange}
    />
  );
};

CurrencyEditor.propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
};

CurrencyEditor.defaultProps = {
  value: undefined,
};

export const Command = ({ id, onExecute }) => {
  const [open, setopen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  if (id === "add")
    return (
      <Button onClick={onExecute} title="Add row" className="btn">
        ADD ROW
      </Button>
    );
  else if (id === "delete")
    return (
      <>
        <IconButton onClick={() => setopen(true)} title="Delete">
          <DeleteIcon className="delete" />
        </IconButton>
        <AlertDialog
          open={open}
          handleClickOpen={() => {
            setopen(false);
            setOpenTwo(true);
          }}
          handleClose={() => {
            setopen(false);
          }}
          description="Are you sure you want to delete this row?"
        />
        <AlertDialog
          open={openTwo}
          handleClickOpen={() => {
            onExecute();
            setOpenTwo(false);
          }}
          handleClose={() => {
            setOpenTwo(false);
          }}
          description="All the mapping associated to the row will be removed. Do you still want to proceed?"
        />
      </>
    );
  else if (id === "edit")
    return (
      <IconButton onClick={onExecute} title="Edit">
        <EditIcon className="edit" />
      </IconButton>
    );
  else if (id === "commit")
    return (
      <IconButton onClick={onExecute} title="Save">
        <SaveIcon className="save" />
      </IconButton>
    );
  else
    return (
      <IconButton onClick={onExecute} title="Cancel">
        <CancelIcon className="cancel" />
      </IconButton>
    );
};

export const RestoredCommand = ({ id, onExecute }) => {
  const [open, setopen] = useState(false);

  if (id === "add") return <Button title="Add row"></Button>;
  else if (id === "delete")
    return (
      <>
        <IconButton onClick={() => setopen(true)} title="Restore">
          <RestoreIcon className="delete" />
        </IconButton>
        <AlertDialog
          open={open}
          handleClickOpen={() => {
            onExecute();
            setopen(false);
          }}
          handleClose={() => setopen(false)}
          description="Are you sure you want to restore this row?"
        />
      </>
    );
  else if (id === "edit") return <IconButton></IconButton>;
  else if (id === "commit")
    return (
      <IconButton onClick={onExecute} title="Save">
        <SaveIcon className="save" />
      </IconButton>
    );
  else
    return (
      <IconButton onClick={onExecute} title="Cancel">
        <CancelIcon className="cancel" />
      </IconButton>
    );
};
