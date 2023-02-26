import {
  View,
  Text,
  Heading,
  Button,
  Flex,
  Input,
  Icon,
  Box,
} from "native-base";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import SearchResultListing from "./SearchResultListing";
import { useDispatch, useSelector } from "react-redux";
import {
  SetsearchType,
  SetSearchResult,
  clearSearchResult,
} from "../../../../slices/buyReportSlice";
import { getMethodWithParams } from "../../../services/apiCalls";
import Validation from "./Validation";
import LoaderSkeleton from "../../reusable/LoaderSkeleton";
import InternetFail from "../../template/InternetFail";
import Error from "../../template/Error";

export default function Step1({ setIndex, setShowValidate, showValidate }) {
  const dispatch = useDispatch();
  const { searchType, searchResult } = useSelector((state) => state.buyReport);
  const [searchInput, setSearchInput] = useState("");
  const [errorInternet, seterrorInternet] = React.useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const searchCustomer = (text) => {
    setSearchInput(text);
    if (text.length >= 4) {
      setisLoading(true);
      if (searchResult.length > 0) {
        dispatch(clearSearchResult());
      }
      if (searchType == "Company/Business") {
        let param1 = [
          {
            username: userInfo[0].name,
            api_token: userInfo[0].apiToken,
            party_type: "B",
            name: text,
            nic_brno: "",
          },
          {
            username: userInfo[0].name,
            api_token: userInfo[0].apiToken,
            party_type: "B",
            name: "",
            nic_brno: text,
          },
          {
            username: userInfo[0].name,
            api_token: userInfo[0].apiToken,
            party_type: "C",
            name: text,
            nic_brno: "",
          },
          {
            username: userInfo[0].name,
            api_token: userInfo[0].apiToken,
            party_type: "C",
            name: "",
            nic_brno: text,
          },
        ];
        param1.map(function (i) {
          getMethodWithParams("searchCompany", i)
            .then((response) => {
              if (response && response.data?.status) {
                let data = response.data.results;
                dispatch(SetSearchResult(data));
              }else{
                setisError(true)
              }
            })
            .catch((err) => {
              console.log(err);
              seterrorInternet(true);
            });
        });
        setTimeout(() => {
          setisLoading(false);
        }, 3000);
      } else {
        let param2 = [
          {
            username: userInfo[0].name,
            api_token: userInfo[0].apiToken,
            search_by: "By Name",
            keyword: text,
          },
          {
            username: userInfo[0].name,
            api_token: userInfo[0].apiToken,
            search_by: "By ID",
            keyword: text,
          },
        ];
        param2.map(function (i) {
          getMethodWithParams("searchIndividual", i)
            .then((response) => {
              if (response && response.data?.status) {
                let data = response.data.data;
                dispatch(SetSearchResult(data));
              }else{
                setisError(true)
              }
            })
            .catch((err) => {
              console.log(err);
              seterrorInternet(true);
            });
        });
        setTimeout(() => {
          setisLoading(false);
        }, 3000);
      }
    }
  };
  const changeSearchType = (type) => {
    dispatch(SetsearchType(type));
    setSearchInput("");
  };
  return (
    <View>
      <View px={4}>
        <Heading size="md" mb={2}>
          Step1
        </Heading>

        {showValidate ? (
          <View>
            <Text fontSize="sm" mb={4}>
              Fill up to validate and buy report
            </Text>
          </View>
        ) : (
          <View>
            <Text fontSize="sm" mb={4}>
              Search for company, business or individual
            </Text>

            <Flex direction="row" p={1} bg={"#E1E1E1"} mb={4}>
              <Button
                w={"50%"}
                bg={
                  searchType == "Company/Business" ? "primary.500" : "#E1E1E1"
                }
                onPress={() => changeSearchType("Company/Business")}
              >
                Company/Business
              </Button>
              <Button
                w={"50%"}
                bg={searchType == "Individual" ? "primary.500" : "#E1E1E1"}
                onPress={() => changeSearchType("Individual")}
              >
                Individual
              </Button>
            </Flex>

            <Input
              mb={4}
              InputRightElement={
                <Icon as={<MaterialIcons name={"search"} />} size={5} mr="2" />
              }
              placeholder={
                searchType === "Company/Business"
                  ? "E.g. Company name or Reg No."
                  : "E.g. Name or NRIC No."
              }
              value={searchInput}
              onChangeText={(text) => searchCustomer(text)}
            />
          </View>
        )}
      </View>

      <Box p={2} px={4} bg={"#E1E1E1"}>
        {showValidate ? (
          <Text fontSize="sm">Validation Form</Text>
        ) : (
          <Text fontSize="sm">Search Result</Text>
        )}
      </Box>

      {/* show validation */}
      {showValidate ? (
        <Validation />
      ) : (
        <View pl={4}>
          {!errorInternet ? (
            <View>
              {isLoading ? (
                <View>
                  <LoaderSkeleton typeVal={"reportSearch"} />
                  <LoaderSkeleton typeVal={"reportSearch"} />
                </View>
              ) : (
                <View>
                  {isError ? (
                    <Error />
                  ) : (
                    <SearchResultListing
                      searchResult={searchResult}
                      searchType={searchType}
                      setIndex={setIndex}
                      setShowValidate={setShowValidate}
                      searchInput={searchInput}
                    />
                  )}
                </View>
              )}
            </View>
          ) : (
            <View mt={-10} pr={4}>
              <InternetFail />
              <Button
                variant="primary"
                mt={-4}
                onPress={() => searchCustomer(searchInput)}
              >
                Try Again
              </Button>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
