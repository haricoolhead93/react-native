import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  userStatus: true,
  languageType: "en",
  isMobileDimension: false,
  isResize: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userStatus = true;
      state.userInfo = [
        {
          name: action.payload.new_username,
          company: "Not Really Relaxing Sdn Bhd",
          apiToken: action.payload.api_token,
        },
      ];
      // console.log(action.payload);
      //   state.value += action.payload;
    },
    // logout: (state) => {
    //   state.value -= 1;
    // },
    setDimensionChange: (state, action) => {
      state.isMobileDimension = action.payload;
    },
    setResize: (state, action) => {
      state.isResize = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setDimensionChange, setResize } =
  userSlice.actions;

export default userSlice.reducer;
