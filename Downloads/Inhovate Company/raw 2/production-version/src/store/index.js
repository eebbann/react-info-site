import { configureStore } from "@reduxjs/toolkit";
import mappingReducer from "./mapping";
import dimMappingReducer from "./dimMapping";
import summaryReducer from "./summary";

export const store = configureStore({
  reducer: {
    mappingReducer,
    dimMappingReducer,
    summaryReducer,
  },
});
