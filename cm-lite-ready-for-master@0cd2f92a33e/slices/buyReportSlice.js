import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showConstitutionModal: false,
  constitutionOption: [
    {
      option: "Business",
    },
    {
      option: "Company",
    },
    {
      option: "Limited Liability Partnership - LLP",
    },
    {
      option: "Individual",
    },
    {
      option: "Other",
    },
  ],
  selectedconstitution: "",
  showBussinessLocationModal: false,
  showOtherEntityModal: false,
  entityChoosen: "",
  LocationOption: [],
  selectedLocation: "",
  tempLocation: [],
  busisnessLocation: "",
  searchType: "Company/Business",
  searchResult: [],
  saveSearchInput: "",
  selectCustomer: [],
  visibleModel: false,
  errorvalue:""

};

export const buyReportSlice = createSlice({
  name: "buyReport",
  initialState,
  reducers: {
    constitutionModal: (state, action) => {
      state.showConstitutionModal = !state.showConstitutionModal;
    },
    constitutionChosen: (state, action) => {
      state.selectedconstitution = action.payload;
      state.showConstitutionModal = !state.showConstitutionModal;
    },
    BussinessLocationModal: (state, action) => {
      state.showBussinessLocationModal = !state.showBussinessLocationModal;
    },
    fetchLocationList: (state, action) => {
      state.LocationOption = action.payload;
      state.tempLocation = action.payload;
    },
    searchArrayLocation: (state, action) => {
      let temp = state.LocationOption;
      const newData = temp.filter((item) => {
        const itemData = item.name.toUpperCase();
        const textData = action.payload.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      state.tempLocation = newData;
    },
    setBussinessLocation: (state, action) => {
      state.busisnessLocation = action.payload;
      state.showBussinessLocationModal = !state.showBussinessLocationModal;
    },
    closeModal: (state, action) => {

      if (state.showConstitutionModal) {
        state.showConstitutionModal = !state.showConstitutionModal;
      }
      if (state.showBussinessLocationModal) {
        state.showBussinessLocationModal = !state.showBussinessLocationModal;
      }
      if (state.showOtherEntityModal) {
        state.showOtherEntityModal = !state.showOtherEntityModal;
      }
    },
    SetsearchType: (state, action) => {
      state.searchType = action.payload;
      state.searchResult = [];
    },
    SetSearchResult: (state, action) => {
      let data = action.payload;
      data.map((i) => {
        if (i.party_type.code) {
          i.party_type = i.party_type.code;
        }
        switch (i.party_type) {
          case "B":
            i.party_type = "Business";
            if (i.legal_id && i.new_reg_number !== "") {
              i.id = "(" + i.legal_id + " / " + i.new_reg_number + ")";
            } else {
              i.id = "(" + i.legal_id + ")";
            }
            break;
          case "C":
            i.party_type = "Company";
            if (i.legal_id && i.new_reg_number !== "") {
              i.id = "(" + i.legal_id + " / " + i.new_reg_number + ")";
            } else {
              i.id = "(" + i.legal_id + ")";
            }
            break;
          case "I":
            i.party_type = "Individual";
            if (i.nic_brno !== "") {
              i.id = i.nic_brno;
            } else {
              i.id = "(" + i.ic_lcno || i.passport_no + ")";
            }
            break;
          case "O":
            i.party_type = "Other";
            break;
          case "LLP":
            i.party_type = "LLP";
            break;
        }
      });
      state.searchResult = [...state.searchResult, ...data];
    },
    clearSearchResult: (state, action) => {
      state.searchResult = [];
    },
    passSearchInput: (state, action) => {
      state.saveSearchInput = action.payload;
    },
    OtherTypeOfEntityModal: (state, action) => {
      state.showOtherEntityModal = !state.showOtherEntityModal;
    },
    entityChosen: (state, action) => {
      state.entityChoosen = action.payload;
      state.showOtherEntityModal = !state.showOtherEntityModal;
    },
    selectedCustomer: (state, action) => {
      state.selectCustomer = action.payload;
      console.log(state.selectCustomer)
    },
    buyReportModel: (state, action) => {
      state.visibleModel = !state.visibleModel;
    },
    errorModel: (state, action) => {
      state.errorvalue = action.payload;
    },
  },
});

export const {
  constitutionModal,
  constitutionChosen,
  BussinessLocationModal,
  closeModal,
  SetsearchType,
  SetSearchResult,
  clearSearchResult,
  fetchLocationList,
  searchArrayLocation,
  setBussinessLocation,
  passSearchInput,
  OtherTypeOfEntityModal,
  entityChosen,
  selectedCustomer,
  buyReportModel,
  errorModel
} = buyReportSlice.actions;

export default buyReportSlice.reducer;
