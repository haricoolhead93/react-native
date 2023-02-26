import { View, Input, Pressable, Select, Button, Box } from "native-base";
import React, { useState } from "react";
import {
  constitutionModal,
  BussinessLocationModal,
  fetchLocationList,
  OtherTypeOfEntityModal,
  selectedCustomer,
} from "../../../../slices/buyReportSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReportBuyingOption } from "../../template/customModal";
import { getMethodWithParams } from "../../../services/apiCalls";

export default function Validation() {
  const dispatch = useDispatch();
  const {
    selectedconstitution,
    busisnessLocation,
    saveSearchInput,
    entityChoosen,
  } = useSelector((state) => state.buyReport);
  const { userInfo } = useSelector((state) => state.user);
  const [bussinessRegNo, setbussinessRegNo] = useState("");
  const [companyRegNo, setcompanyRegNo] = useState("");
  const [LLPRegNo, setLLPRegNo] = useState("");
  const [individualNewICNo, setindividualNewICNo] = useState("");
  const [individualOldICNo, setindividualOldICNo] = useState("");
  const [otherRegNo, setotherRegNo] = useState("");
  const fetchLocation = () => {
    let params = {
      username: userInfo[0].name,
      api_token: userInfo[0].apiToken,
    };
    getMethodWithParams("getLocation", params)
      .then((response) => {
        if (response && response.data?.status) {
          let data = response.data.constants;
          dispatch(fetchLocationList(data));
          dispatch(BussinessLocationModal());
        }
      })
      .catch((err) => {
        //  console.log("hi err", err);
      });
  };
  const fetchEntity = () => {
    dispatch(OtherTypeOfEntityModal());
  };
  const nextStep = () => {
    let data = "";
    if (
      selectedconstitution === "Business" ||
      selectedconstitution === "Company"
    ) {
      data = {
        name: saveSearchInput,
        id: bussinessRegNo || companyRegNo,
        party_type: selectedconstitution,
        bussinessLocation: busisnessLocation,
      };
    }
    if (selectedconstitution === "Individual") {
      data = {
        name: saveSearchInput,
        id: individualNewICNo || individualOldICNo,
        party_type: selectedconstitution,
      };
    }
    dispatch(selectedCustomer(data));
  };
  return (
    <View p={4}>
      <Input
        mb={4}
        value={saveSearchInput}
        // onChangeText={(text2) => setSearchInput(text2)}
      />
      <Pressable mb={4} onPress={() => dispatch(constitutionModal())}>
        <Select
          isDisabled
          placeholder={
            selectedconstitution === ""
              ? "Select Constitution"
              : selectedconstitution
          }
        ></Select>
      </Pressable>
      <ReportBuyingOption />

      <View>
        {selectedconstitution === "Business" ? (
          <View>
            <Pressable mb={4} onPress={() => fetchLocation()}>
              <Select
                isDisabled
                placeholder={
                  busisnessLocation === "" ? "Location" : busisnessLocation
                }
              ></Select>
            </Pressable>

            <Input
              mb={4}
              placeholder="Business Registration No."
              value={bussinessRegNo}
              onChangeText={(text) => setbussinessRegNo(text)}
            />
          </View>
        ) : null}

        {selectedconstitution === "Company" ? (
          <View>
            <Input
              mb={4}
              placeholder="Company Registration No."
              value={companyRegNo}
              onChangeText={(text) => setcompanyRegNo(text)}
            />
          </View>
        ) : null}

        {selectedconstitution === "Limited Liability Partnership - LLP" ? (
          <View>
            <Input
              mb={4}
              placeholder="LLP Registration No."
              value={LLPRegNo}
              onChangeText={(text) => setLLPRegNo(text)}
            />
          </View>
        ) : null}

        {selectedconstitution === "Individual" ? (
          <View>
            <Input
              mb={4}
              placeholder="New NRIC No. or Passport No."
              value={individualNewICNo}
              onChangeText={(text) => setindividualNewICNo(text)}
            />
            <Input
              mb={4}
              placeholder="Old NRIC No."
              value={individualOldICNo}
              onChangeText={(text) => setindividualOldICNo(text)}
            />
          </View>
        ) : null}

        {selectedconstitution === "Other" ? (
          <View>
            <Pressable mb={4} onPress={() => fetchEntity()}>
              <Select
                isDisabled
                placeholder={
                  entityChoosen === "" ? "Type of entity" : entityChoosen
                }
              ></Select>
            </Pressable>
            <Input
              mb={4}
              placeholder="Registration No."
              value={otherRegNo}
              onChangeText={(text) => setotherRegNo(text)}
            />
          </View>
        ) : null}

        <Button variant="primary" onPress={() => nextStep()}>
          Next
        </Button>
      </View>
    </View>
  );
}
