import {
  Badge,
  View,
  Text,
  ScrollView,
  FlatList,
  HStack,
  Heading,
  Button,
  Box,
  Image,
  Center,
} from "native-base";
import React from "react";
import companyNotFound from "../../../../assets/image/companyNotFound.png";
import individualNotFound from "../../../../assets/image/individualNotFound.png";
import HighlightText from "@sanar/react-native-highlight-text";
import { passSearchInput, selectedCustomer } from "../../../../slices/buyReportSlice";
import { useDispatch } from "react-redux";

export default function SearchResultListing({
  searchResult,
  searchType,
  setIndex,
  setShowValidate,
  searchInput,
}) {
  let imgSource = companyNotFound;
  const dispatch = useDispatch();
  if (searchType === "Individual") {
    imgSource = individualNotFound;
  }
  const buyHandler = (customer) => {
    dispatch(selectedCustomer(customer));
    setIndex(1); // go to step 2
  };

  // const buyHandler = (customer) => {


   
    
  // };
  const isValidation = () => {
    setShowValidate(true);
    dispatch(passSearchInput(searchInput));
  };
  return (
    <View>
      {searchResult.length === 0 ? (
        <Center px={8}>
          <Image
            source={{ uri: imgSource }}
            alt="no result"
            h={24}
            w={40}
            mt={8}
            mb={2}
          />
          {searchType === "Company/Business" ? (
            <>
              <Text fontSize="sm" textAlign={"center"}>
                You can search by company name or registration number with an
                input of at least 4 characters
              </Text>
            </>
          ) : (
            <>
              <Text fontSize="sm" textAlign={"center"}>
                You can search by Name or NRIC number.
              </Text>
            </>
          )}
        </Center>
      ) : (
        <ScrollView h={80}>
          <FlatList
            mb={4}
            data={searchResult}
            keyExtractor={(item, index) => "key" + index}
            // onEndReached={} // unfinish need to intergrate with api
            renderItem={({ item }) => (
              <HStack
                space={2}
                borderBottomWidth="1"
                borderColor="#E1E1E1"
                py={2}
              >
                <View w={"75%"}>
                  <Heading size="sm">
                    <HighlightText
                      highlightStyle={{ backgroundColor: "#E1E1E1" }}
                      searchWords={[searchInput]}
                      textToHighlight={item.name}
                    />
                  </Heading>
                  <Text fontSize="sm" mb={1}>
                    <HighlightText
                      highlightStyle={{ backgroundColor: "#E1E1E1" }}
                      searchWords={[searchInput]}
                      textToHighlight={item.id}
                    />
                  </Text>
                  <HStack space={2}>
                    <Badge
                      variant="solid"
                      borderRadius="md"
                      colorScheme="primary"
                    >
                      {item.party_type}
                    </Badge>
                  </HStack>
                </View>
                <View w={"25%"}>
                  <Button
                    size="md"
                    variant="link"
                    colorScheme="red"
                    onPress={() => buyHandler(item)}
                  >
                    Buy
                  </Button>
                </View>
              </HStack>
            )}
          />
          <Box
            alignContent={"center"}
            bg={"#E1F0F1"}
            alignItems={"center"}
            p={2}
            mb={4}
          >
            <Heading size="sm" mb={1} underline>
              Didn't find what you're looking for?
            </Heading>
            <Text fontSize="sm" mb={1}>
              Please proceed to validate and buy desired report.
            </Text>
            <Button
              w={"full"}
              variant={"solid"}
              colorScheme={"orange"}
              mb={1}
              onPress={() => isValidation()}
            >
              Validate & Buy Now
            </Button>
          </Box>
        </ScrollView>
      )}
    </View>
  );
}
