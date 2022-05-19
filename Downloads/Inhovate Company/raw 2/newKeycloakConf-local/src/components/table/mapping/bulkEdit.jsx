import React, { useState, useMemo } from "react";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  InputAdornment,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { update_map_date_bulk } from "../../../store/api/mapping";

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const SelectInput = ({ options, value, onChange, placeholder }) => {
  const [searchText, setSearchText] = useState("");

  const displayedOptions = useMemo(
    () => options.filter((option) => containsText(option.label, searchText)),
    [searchText, options]
  );
  return (
    <FormControl fullWidth>
      <InputLabel id="search-select-label">{placeholder}</InputLabel>
      <Select
        MenuProps={{ autoFocus: false }}
        labelId="search-select-label"
        id="search-select"
        value={value}
        onChange={(e) => onChange(e)}
        onClose={() => setSearchText("")}
        renderValue={() => value}
      >
        <ListSubheader>
          <TextField
            size="small"
            // Autofocus on textfield
            autoFocus
            placeholder="Type to search..."
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Escape") {
                // Prevents autoselecting item while typing (default Select behaviour)
                e.stopPropagation();
              }
            }}
          />
        </ListSubheader>
        {displayedOptions.map((m, i) => (
          <MenuItem value={m.value} key={i} disabled={m.disable}>
            {m.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default function FormDialog({ setReload }) {
  const { selections, mappingData, rows } = useSelector(
    (state) => state.mappingReducer
  );

  const [open, setOpen] = useState(false);
  const [formInput, setFormInput] = useState([]);
  const params = useParams();
  const dispatch = useDispatch;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const waitAndReload = () => {
    setTimeout(() => {
      setReload(prevState => !prevState)
    }, 2000);
  }

  const handleApplyChange = () => {
    update_map_date_bulk(
      formInput,
      mappingData,
      selections,
      rows,
      params,
      dispatch
    );
    handleClose();
    waitAndReload();
  };

  return (
    <div>
      <>
        <Button
          onClick={handleClickOpen}
          sx={{ margin: 2 }}
          variant="contained"
          disabled={selections.length < 2}
        >
          Bulk Edit
        </Button>
      </>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle className=" ">Mapping Details</DialogTitle>
        <DialogContent>
          <DialogContentText className="marginBt">
             Please select the respective mapping code of the Perspective Dimension <br/> 
             <strong>
               {selections.length} selected rows
            </strong>
          </DialogContentText>

         

          {mappingData.length > 0 ? (
            mappingData?.map((m, i) => (
              <Box sx={{ marginY: 2 }} key={i}>
                <SelectInput
                  value={formInput[i]}
                  onChange={(e) => {
                    let res = formInput;
                    res[i] = e.target.value;
                    setFormInput([...res]);
                  }}
                  placeholder={m.element.perspectiveMasterName}
                  options={m?.options?.map((m) => ({
                    label: m?.longName,
                    value: `${m?.inhovateCode}-${m?.longName}`,
                    disable: !m?.isTransaction,
                  }))}
                />
              </Box>
            ))
          ) : (
            <Box sx={{ marginX: "auto", fontSize: 20, width: "max-content" }}>
              loading...
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="dialog-mg">
            Cancel
          </Button>
          <Button onClick={handleApplyChange}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
