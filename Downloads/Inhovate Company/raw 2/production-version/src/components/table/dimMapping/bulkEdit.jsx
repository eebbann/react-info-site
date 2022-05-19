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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetch_dim_data } from "../../../store/api/dimMapping";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
//import VirtualizedSelect from "react-virtualized";

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

export default function FormDialog() {
  const { propertyId, propertyCode, selections, options } = useSelector(
    (state) => state.dimMappingReducer
  );

  const [open, setOpen] = useState(false);
  const [parentCode, setParentCode] = useState("");
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => options.filter((option) => containsText(option.label, searchText)),
    [searchText, options]
  );
  const dispatch = useDispatch();
  const params = useParams();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const userToken = sessionStorage.getItem("user-token")

  const bulkEdit = async () => {
    const payload = {
      propertyId: propertyId,
      propertyCode: propertyCode,
      attributeName: "parent code",
      attributeValue: parentCode.toString(),
      ids: selections,
      statusMessage: "Success",
    };
    await axios
      .put("/api/property/data/coa/" + propertyId + "/attribute", payload, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then((response) => {
        if (response.data.statusMessage === "SUCCESS") {
          toast.success("success");
          fetch_dim_data(params, dispatch);
        } else {
          toast.error(response.data.statusMessage);
        }
      })
      .catch((error) => {
        toast.error(error.response);
      });
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
        <DialogTitle className=" ">Parent-Code Bulk Edit</DialogTitle>
        <DialogContent>
          <DialogContentText className="marginBt">
            Choose from List to populate your selected rows for Parent Code{" "}
            {selections.length} selected rows
          </DialogContentText>
          <div className="autocom">
            <FormControl fullWidth>
              <InputLabel id="search-select-label"> Search</InputLabel>
              <Select
                // Disables auto focus on MenuItems and allows TextField to be in focus
                MenuProps={{ autoFocus: false }}
                labelId="search-select-label"
                id="search-select"
                value={parentCode}
                onChange={(e) => {
                  setParentCode(e.target.value);
                }}
                onClose={() => setSearchText("")}
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
                <MenuItem value="">No Parent</MenuItem>
                {displayedOptions.map((m) => (
                  <MenuItem value={m.code} key={m.code}>
                    {m.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <VirtualizedSelect
              options={options}
              onChange={(selectValue) => this.setState({ selectValue })}
              value={this.state.selectValue}
            /> */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="dialog-mg">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              bulkEdit();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
