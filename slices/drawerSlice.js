import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerStatus: false,
  activedrawer: 0,
  subActiveOption: null,
  headerDash: true,
  Reinforce: false,
  isSearchHeaderOpen: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setWidth: (state, action) => {
      state.drawerStatus = action.payload;
    },
    setActiveDrawer: (state, action) => {
      state.activedrawer = action.payload;
    },
    setSubActiveOption: (state, action) => {
      state.subActiveOption = action.payload;
    },
    setDashHeader: (state, action) => {
      state.headerDash = action.payload;
    },
    setReinforce: (state, action) => {
      state.Reinforce = action.payload;
    },
    setSearchHeader: (state, action) => {
      state.isSearchHeaderOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setWidth,
  setActiveDrawer,
  setSubActiveOption,
  setDashHeader,
  setReinforce,
  setSearchHeader,
} = drawerSlice.actions;

export default drawerSlice.reducer;
