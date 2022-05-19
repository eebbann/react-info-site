import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  rows: [],
  headers: [],
  propertyId: "",
  loading: false,
  propertyCode: "",
  propertyMasterId: "",
  propertyMasterCode: "",
  perpertives: [],
  selections: [],
  mappingData: [],
};
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    is_loading: (state) => (state = { ...state, loading: true }),
    fetch_mappingData: (state, action) => {
      return (state = {
        ...state,
        ...action.payload,
        loading: false,
        mappingData: [],
      });
    },

    dispatch__perspectives: (state, action) => {
      return (state = {
        ...state,
        perpertives: action.payload,
        loading: false,
      });
    },

    get_selections: (state, action) => ({
      ...state,
      selections: action.payload,
    }),
    add_mapping_data: (state, action) => {
      return {
        ...state,
        mappingData: [...state.mappingData, action.payload],
      };
    },
  },
});

export const {
  fetch_mappingData,
  is_loading,
  dispatch__perspectives,
  get_selections,
  add_mapping_data,
} = dataSlice.actions;

export default dataSlice.reducer;
