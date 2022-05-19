import { configureStore } from "@reduxjs/toolkit";
import mappingReducer from "./mapping";
import dimMappingReducer from "./dimMapping";
import summaryReducer from "./summary";
import userReducer from './user'

export const store = configureStore({
  reducer: {
    mappingReducer,
    dimMappingReducer,
    summaryReducer,
    userReducer
  },
});
