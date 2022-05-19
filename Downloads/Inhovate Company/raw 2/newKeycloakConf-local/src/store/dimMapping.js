import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  active_rows: [],
  deleted_rows: [],
  rows: [],
  headers: [],
  propertyId: "",
  loading: false,
  propertyCode: "",
  propertyMasterId: "",
  propertyMasterCode: "",
  options: [],
  selections: [],
  generateCodeIsEmty: false,
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    is_loading: (state) => (state = { ...state, loading: true }),
    fetch_dimMappingData: (state, { payload }) => {
      return (state = {
        ...state,
        ...payload,
        loading: false,
        generateCodeIsEmty:
          payload.rows.filter((row) => row["inHovate code"] === null).length >
          0,

        active_rows: payload.rows.filter(
          (row) => row["deletion status"] === "false"
        ),
        deleted_rows: payload.rows.filter(
          (row) => row["deletion status"] === "true"
        ),
        headers: payload.headers.map((header) => ({
          name: header,
          title: capitalizeFirstLetter(header),
        })),
        options: payload.rows.map((row) => ({
          label: "" + row.code + " - " + row.description,
          code: row.code,
        })),
      });
    },
    get_selections: (state, action) => ({
      ...state,
      selections: action.payload,
    }),
  },
});

export const { fetch_dimMappingData, is_loading, get_selections } =
  dataSlice.actions;

export default dataSlice.reducer;
