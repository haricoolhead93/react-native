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

export default function Step1({setIndex}) {
  //const setIndex = props.setIndex;
  const [searchType, setSearchType] = useState("Company/Business");
  const [searchResult, setSearchResult] = useState([
    // {
    //   subjectName: "DATA SYSTEMS SDN. BHD",
    //   subjectId: "(199401030027 / 0315708X)",
    //   subjectType: "Company",
    // },
  ]); //sample
  return (
    <View>
      <View px={4}>
        <Heading size="md" mb={2}>
          Step1
        </Heading>
        <Text fontSize="sm" mb={4}>
          Search for company, business or individual
        </Text>

        <Flex direction="row" p={1} bg={"#E1E1E1"} mb={4}>
          <Button
            w={"50%"}
            bg={searchType == "Company/Business" ? "primary.500" : "#E1E1E1"}
            onPress={() => setSearchType("Company/Business")}
          >
            Company/Business
          </Button>
          <Button
            w={"50%"}
            bg={searchType == "Individual" ? "primary.500" : "#E1E1E1"}
            onPress={() => setSearchType("Individual")}
          >
            Individual
          </Button>
        </Flex>

        <Input
          mb={4}
          InputRightElement={
            <Icon as={<MaterialIcons name={"search"} />} size={5} mr="2" />
          }
          placeholder="E.g. Company name or Reg No."
        />
      </View>

      <Box p={2} px={4} bg={"#E1E1E1"}>
        <Text fontSize="sm">Search Result</Text>
      </Box>

      <View px={4}>
        <SearchResultListing searchResult={searchResult} searchType={searchType} setIndex={setIndex}/>
      </View>
    </View>
  );
}
// onPress={() => setIndex(1)}
