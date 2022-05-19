import React, { useState, useMemo } from "react";
import {
  FormControl,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const containsText = (text, searchText) =>
  text?.toLowerCase().indexOf(searchText?.toLowerCase()) > -1;
function Select({ options, value, onChange }) {
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () =>
      [{ label: "ade", value: "ade" }].filter((option) =>
        containsText(option.label, searchText)
      ),
    [searchText, options]
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="search-select-label"> Search</InputLabel>
      <Select
        // Disables auto focus on MenuItems and allows TextField to be in focus
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
        {displayedOptions.map((m) => (
          <MenuItem value={m.code} key={m.value}>
            {m.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Select;
