import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  rows: [],
  loading: false,
};
export const dataSlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    is_loading: (state) => (state = { ...state, loading: true }),
    fetch_summaryData: (state, action) => {
      return (state = {
        ...state,
        rows: action.payload,
        loading: false,
      });
    },
  },
});

export const { fetch_summaryData, is_loading } = dataSlice.actions;

export default dataSlice.reducer;
