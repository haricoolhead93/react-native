import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import drawerReducer from "./slices/drawerSlice";
import infoReducer from "./slices/infoSlice";
import buyReportReducer from './slices/buyReportSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    drawer: drawerReducer,
    info: infoReducer,
    buyReport: buyReportReducer,
  },
});
