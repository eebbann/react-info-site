import React, { useState, useEffect, useMemo } from "react";
import { TableEditRow } from "@devexpress/dx-react-grid-material-ui";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

export const EditCell = (props) => {
  const { ...cellProps } = props;
  const [menu, setMenu] = useState([]);
  const { active_rows } = useSelector((state) => state.dimMappingReducer);

  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => menu.filter((option) => containsText(option.title, searchText)),
    [searchText, menu]
  );
	const no_parent = " ";
  //API call for description and code concatenation
  useEffect(() => {
    //@API CALL for location select data
    const menu_data = active_rows.map((row) => ({
      value: `${row.code}- ${row.description}`,
      title: `${row.code}- ${row.description}`,
    }));
    setMenu(menu_data);
  }, []);

  if (cellProps?.tableColumn?.column?.name === "parent code & description") {
    return (
      <FormControl fullWidth>
        <InputLabel id="search-select-label"> Search</InputLabel>
        <Select
          // Disables auto focus on MenuItems and allows TextField to be in focus
          MenuProps={{ autoFocus: false }}
          labelId="search-select-label"
          id="search-select"
          {...cellProps}
          value={cellProps.value}
          onChange={(e) => cellProps.onValueChange(e.target.value)}
          onClose={() => setSearchText("")}
          renderValue={() => cellProps.value}
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
          <MenuItem value="n/a ">No Parent</MenuItem>
          {displayedOptions.map((m) => (
            <MenuItem value={m.value} key={m.value}>
              {/* concatenate no parent on top and {m.title} */}
						 {m.title} 
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  return <TableEditRow.Cell {...cellProps} />;
};
