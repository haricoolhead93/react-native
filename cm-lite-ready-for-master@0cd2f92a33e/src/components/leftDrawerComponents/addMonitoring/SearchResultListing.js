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

export default function SearchResultListing(props) {
  const searchResult = props.searchResult;
  const searchType = props.searchType;
  let imgSource = companyNotFound;
  if (searchType === "Individual") {
    imgSource = individualNotFound;
  }
  return (
    <View>
      {searchResult.length === 1 ? (
        <Center px={8}>
          <Image
            source={{uri:imgSource}}
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
                  <Heading size="sm">{item.subjectName}</Heading>
                  <Text fontSize="sm" mb={1}>
                    {item.subjectId}
                  </Text>
                  <HStack space={2}>
                    <Badge
                      variant="solid"
                      borderRadius="md"
                      colorScheme="primary"
                    >
                      {item.subjectType}
                    </Badge>
                  </HStack>
                </View>
                <View w={"25%"}>
                  <Button size="md" variant="link" colorScheme="red">
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
            <Button w={"full"} variant={"solid"} colorScheme={"orange"} mb={1}>
              Validate & Buy Now
            </Button>
          </Box>
        </ScrollView>
      )}
    </View>
  );
}
