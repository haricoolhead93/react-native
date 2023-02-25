import {
  Box,
  Text,
  FlatList,
  Heading,
  HStack,
  View,
  Badge,
  Circle,
  Icon,
  Pressable,
  Flex,
  VStack,
  Input,
} from "native-base";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import LoaderSkeleton from "./LoaderSkeleton";
import { Linking } from "react-native";
import { REACT_NATIVE_APP_BASE_URL } from "@env";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { relationshipObj } from "./MockDataTemplate";

export default function ListingFLatList(props) {
  const [showInfo, setShowInfo] = useState(false);
  const [refineMargin, setRefineMargin] = useState("-65px");
  const [chevronIcon, setChevronIcon] = useState("chevron-down");
  const data = props.data;
  let counter = 1;
  const fetchMoreData = () => {
    counter++;
    if (props?.setcurrentPage) {
      props.setcurrentPage(counter);
      // console.log("fetch more is getting called");
    }
  };

  const showStatusInfo = function () {
    setShowInfo(!showInfo);
    if (!showInfo) {
      setRefineMargin("-5px");
      setChevronIcon("chevron-up");
    } else {
      setRefineMargin("-65px");
      setChevronIcon("chevron-down");
    }
  };

  return (
    <Box borderRadius="md" p={2} bg="white" mt={refineMargin}>
      {/* add button to hide/show status info report */}
      <Pressable
        onPress={() => showStatusInfo()}
        position={"absolute"}
        left={"50%"}
        top={"0"}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <Circle size="25px" bg="#000">
          <Icon
            as={<Entypo name={chevronIcon} />}
            color={"white"}
            size={"sm"}
          />
        </Circle>
      </Pressable>

      <FlatList
        data={data}
        keyExtractor={(item, index) => "key" + index}
        // onEndReached={fetchMoreData} // unfinish need to intergrate with api
        renderItem={({ item }) => (
          <View>
            {props.loading ? (
              <Box rounded={8} px={1} py={2} mx={3}>
                <LoaderSkeleton typeVal={"mobileReport"} />
              </Box>
            ) : (
              <HStack p={2} space={2}>
                <View w={"75%"}>
                  <HStack space={2}>
                    {/* subject name [report ]*/}
                    {item.Subject && item.isReports ? (
                      <Heading
                        fontSize="sm"
                        mb={1}
                        onPress={() => {
                          callURL(item.Subject);
                        }}
                      >
                        <Text
                          color={"#007B85"}
                          onPress={() => {
                            callURL(item.Subject);
                          }}
                        >
                          {format(item.Subject)}
                        </Text>
                        {renderRegn(item.Subject)}
                      </Heading>
                    ) : null}
                    {/* Subject Name monitoring */}
                    {item.subject_name ? (
                      <Heading fontSize="sm" mb={1} color={"primary.500"}>
                        <Text textDecorationLine={"underline"}>
                          {item.subject_name}
                        </Text>
                        {item.is_viewed == false ? (
                          <Icon
                            as={<FontAwesome name="circle" />}
                            color={"red.50"}
                            ml={1}
                            size="xs"
                          />
                        ) : (
                          ""
                        )}
                      </Heading>
                    ) : null}
                    {/* etr name for etr submitted*/}
                    {item.etr_subject ? (
                      <Heading fontSize="sm" mb={1}>
                        {item.etr_subject}
                      </Heading>
                    ) : null}
                    {/* hits alert for monitoring*/}
                    {item.hits ? (
                      <Badge
                        variant="solid"
                        borderRadius="md"
                        colorScheme="red"
                      >
                        {item.hits}
                      </Badge>
                    ) : null}
                  </HStack>
                  {/* subject id no [report , monitor and etr]*/}
                  {/* <Text size="sm" h={"auto"} mb={1}>
                    (1210127X / - )
                  </Text> */}

                  {/* relationship and customer name for view monitoring*/}
                  {item.ds || item.customer_name ? (
                    <VStack mb={"10px"}>
                      {item.ds ? (
                        <Flex direction="row" alignItems={"center"} mt={"5px"}>
                          <Icon
                            as={<FontAwesome5 name="user-alt" />}
                            color={"gray.100"}
                            mr={"10px"}
                            size="xs"
                          />
                          <Text fontSize={"12px"} h={"auto"}>
                            {relationshipObj[item.ds]}
                          </Text>
                        </Flex>
                      ) : null}

                      {item.customer_name ? (
                        <Flex direction="row" alignItems={"center"} mt={"5px"}>
                          <Icon
                            as={<FontAwesome5 name="crown" />}
                            color={"yellow.50"}
                            mr={"10px"}
                            size="xs"
                          />
                          <Text fontSize={"12px"} h={"auto"}>
                            {item.customer_name}
                          </Text>
                        </Flex>
                      ) : null}
                    </VStack>
                  ) : null}

                  <HStack space={2}>
                    {/* subject type [report , monitor and etr]*/}
                    {item.type ? (
                      <Badge
                        variant="solid"
                        borderRadius="md"
                        colorScheme="primary"
                      >
                        {item.type}
                      </Badge>
                    ) : null}

                    {/* report type for report */}
                    {item.report ? (
                      <Badge
                        variant="solid"
                        borderRadius="md"
                        colorScheme="primary"
                      >
                        {item.report}
                      </Badge>
                    ) : null}

                    {/* alert type for monitoring */}
                    {item.report_type === "eTR" ? (
                      <Badge variant="solid" borderRadius="md" bg={"yellow.50"}>
                        {item.report_type}
                      </Badge>
                    ) : null}
                    {item.report_type === "CTOS" ? (
                      <Badge variant="solid" borderRadius="md" bg={"red.50"}>
                        {item.report_type}
                      </Badge>
                    ) : null}

                    {/* status for report */}
                    {item.status === "ready" ? (
                      <Badge
                        variant="solid"
                        borderRadius="md"
                        colorScheme="success"
                      >
                        {item.status}
                      </Badge>
                    ) : null}
                    {item.status === "in progress" ? (
                      <Badge
                        variant="solid"
                        borderRadius="md"
                        colorScheme="yellow"
                      >
                        {item.status}
                      </Badge>
                    ) : null}
                    {item.status === "failed" ? (
                      <Badge
                        variant="solid"
                        borderRadius="md"
                        colorScheme="red"
                      >
                        {item.status}
                      </Badge>
                    ) : null}
                  </HStack>
                </View>
                <View w={"25%"}>
                  {/* date for report */}
                  {item.Requested_Date ? (
                    <Heading fontSize="sm">{item.Requested_Date}</Heading>
                  ) : null}
                  {/* alert date for monitor */}
                  {item.report_date ? (
                    <Heading fontSize="sm">{item.report_date}</Heading>
                  ) : null}
                  {/* amount for etr */}
                  {item.amount ? (
                    <Heading fontSize="sm">{item.amount}</Heading>
                  ) : null}
                </View>
              </HStack>
            )}
          </View>
        )}
      />
    </Box>
  );

  // to format teh subject and split the subject to open the relevant report id
  function format(cell) {
    let substrings = cell.split("&");
    if (substrings.length > 0) {
      return substrings[0];
    }
  }
  function renderRegn(cell) {
    let substrings = cell.split("&");
    if (substrings.length > 0) {
      return substrings[4];
    }
  }
  function callURL(cell) {
    let substrings = cell.split("&");
    if (substrings.length > 0) {
      let URL =
        REACT_NATIVE_APP_BASE_URL +
        "creditfile/api/download/ctos?username=" +
        substrings[2] +
        "&api_token=" +
        substrings[3] +
        "&report_uid=" +
        substrings[1];
      Linking.openURL(URL);
    }
  }
}
