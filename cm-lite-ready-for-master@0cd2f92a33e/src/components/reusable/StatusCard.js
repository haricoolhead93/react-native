import {
  Text,
  View,
  Flex,
  Spacer,
  Heading,
  Button,
  Box,
  Image,
  Center,
  FlatList,
  Badge,
  HStack,
  Input,
  Icon,
  Skeleton,
} from "native-base";
import { isDesktop } from "react-device-detect";
import { ImageBackground } from "react-native";
import LoaderSkeleton from "./LoaderSkeleton";
import { CustomModal } from "../template/customModal";
import React from "react";
import { TouchableOpacity } from "react-native-web";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function StatusCard(props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const statusTypeWeb = props.statusTypeWeb;
  const statusTypeMobile = props.statusTypeMobile;
  const status = props.status;
  const total = props.total;
  const unreadAlert = props.unreadAlert;
  const enableButton = props.enableButton;
  const buttonName = props.buttonName;
  const setModalId = props.setModalId;
  const setModalTitle = props.setModalTitle;
  const modalId = props.modalId;
  const [makeSearchVisible, setmakeSearchVisible] = React.useState("");
  const searchInput = props.searchInput;
  const setsearchInput = props.setsearchInput;
  const [searchTerm, setSearchTerm] = React.useState("");

  const { isSearchHeaderOpen } = useSelector((state) => state.drawer);

  const [index, setIndex] = React.useState(0);

  const showModal = function (input) {
    setModalVisible(!modalVisible);
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      callMethod(searchTerm);
      // Send Axios request here
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  function callMethod(searchTerm) {
    if (searchTerm && searchTerm.length > 0) {
      setsearchInput(searchTerm);
    }
  }

  if (isDesktop) {
    return (
      <View mb={6} p={4}>
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          name={props.buttonName}
          showButton={false}
          index={index}
          setIndex={setIndex}
        />
        <Flex direction="row" mb={6}>
          <Heading size="lg">{statusTypeWeb}</Heading>
          <Spacer />
          <Button onPress={() => showModal()} mt="2" variant="primary">
            {buttonName}
          </Button>
        </Flex>
        <FlatList
          data={status}
          horizontal
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => (
            <Box
              borderRadius="md"
              py={6}
              px={6}
              mr={2}
              width={"sm"}
              bg={"white"}
            >
              <Flex direction="row">
                <Center>
                  <Image
                    source={item.icon}
                    alt="icon"
                    width={"10"}
                    height={"10"}
                    mr={4}
                  />
                </Center>
                <View>
                  <Text fontSize="sm" mb={2}>
                    {item.title}
                  </Text>
                  <Heading size="md">
                    {item.figure != null ? (
                      item.figure
                    ) : (
                      <Skeleton h="3" rounded="sm" w="1/2" />
                    )}
                  </Heading>
                </View>
              </Flex>
            </Box>

            //using this Loader to handle the API calls
            // <Box
            //   borderRadius="md"
            //   py={6}
            //   px={6}
            //   mr={2}
            //   width={"sm"}
            // >
            //   <Flex direction="row">
            //     <LoaderSkeleton typeVal={"progress"}/>

            //   </Flex>
            // </Box>
          )}
        />
      </View>
    );
  } else {
    return (
      <View>
        <ImageBackground
          source={require("../../../assets/image/handshake-mobile.png")}
          resizeMode="cover"
          style={{
            height: !isSearchHeaderOpen ? "35vh" : "40vh",
            width: "100%",
          }}
        >
          <Box pt={10} px={4}>
            <Flex direction="row">
              <Heading size="sm" color="white">
                {statusTypeMobile}
              </Heading>
              <Spacer />
              <Button
                onPress={() => showModal()}
                size={"xs"}
                bg={"red.50"}
                variant="solid"
              >
                {buttonName}
              </Button>
            </Flex>
            <Flex direction="row">
              <Text fontSize="sm" color="white">
                {total}
              </Text>

              {unreadAlert ? (
                <Badge
                  bg={"red.50"}
                  alignSelf="center"
                  variant="solid"
                  borderRadius="md"
                  ml={2}
                >
                  {unreadAlert + " unread"}
                </Badge>
              ) : null}
            </Flex>
            <FlatList
              data={status}
              horizontal
              keyExtractor={(item, index) => "key" + index}
              ItemSeparatorComponent={() => (
                <View style={{ marginHorizontal: "30px" }} />
              )}
              renderItem={({ item }) => (
                <View mr={8} mt={10}>
                  <Text fontSize="sm" color="white">
                    {item.title}
                  </Text>
                  <Text fontSize="sm" color="white">
                    {item.figure != null ? (
                      item.figure
                    ) : (
                      <Skeleton h="3" rounded="sm" w="1/2" />
                    )}
                  </Text>
                </View>
              )}
            />

            {isSearchHeaderOpen ? (
              <Input
                borderRadius={"md"}
                mt={"10px"}
                mb={"10px"}
                mr={"30px"}
                w={"100%"}
                borderColor={"gray.200"}
                type="text"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
                InputRightElement={
                  <Button
                    ml={1}
                    bgColor={"#EBEBEB"}
                    roundedLeft={0}
                    roundedRight="md"
                  >
                    <Icon
                      as={<Feather name="search" color={"#797979"} />}
                      size="lg"
                    />
                  </Button>
                }
                placeholder="Search"
              />
            ) : null}
          </Box>
        </ImageBackground>
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          name={props.buttonName}
          showButton={false}
          index={index}
          setIndex={setIndex}
        />
      </View>
    );
  }
}
