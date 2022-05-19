import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
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


const Dropdown = (props) => {
  const { code, masterCode, ...cellProps } = props;
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => data.filter((option) => containsText(option.title, searchText)),

    [searchText, data]
  );
  const userToken = sessionStorage.getItem("user-token")
  useEffect(() => {
    axios
      .get(`/api/property/data/perspective/${code}/master/${masterCode}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then((res) => {
        const r = res.data.data.map((m) => ({
          title: m?.longName,
          value: `${m?.inhovateCode}-${m?.longName}`,
          disable: m?.isTransaction,
        }));
        setData(r);
      })
      .catch((err) => console.log(err));
  }, []);

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
        {displayedOptions.length > 0 ? (
          displayedOptions.map((m, i) => {
            if (!m.disable) {
              return (
                <MenuItem
                  sx={{ color: "brown" }}
                  disableTouchRipple={true}
                  disabled={true}
                  value={m.value}
                  key={i}
                >
                  {m.title}
                </MenuItem>
              );
            } else {
              return (
                <MenuItem value={m.value} key={i}>
                  {m.title}
                </MenuItem>
              );
            }
          })
        ) : (
          <MenuItem>NO DATA</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export const EditCell = (props) => {
  const { ...cellProps } = props;
  const { perpertives } = useSelector((state) => state.mappingReducer);

  const column_name = cellProps?.tableColumn?.column?.name;

  if (column_name.includes("mapping")) {
    const row = perpertives.find((ro) =>
      column_name.includes(ro.perspectiveMasterName.toLowerCase())
    );

    return (
      <td>
        {row ? (
          <Dropdown
            {...cellProps}
            code={row.perspectiveCode}
            masterCode={row.perspectiveMasterCode}
          />
        ) : (
          "Data NOT FETCHINHG"
        )}
      </td>
    );
  }
  return (
    <td>
      <TextField
        hiddenLabel
        defaultValue="Normal"
        disabled
        {...cellProps}
        value={cellProps.value}
        onChange={(e) => cellProps.onValueChange(e.target.value)}
      />
    </td>
  );
};
