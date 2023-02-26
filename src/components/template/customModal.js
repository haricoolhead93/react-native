import {
  View,
  Flex,
  Spacer,
  Heading,
  Button,
  Modal,
  Text,
  Menu,
  Input,
  Box,
  Center,
} from "native-base";
import { Dimensions } from "react-native";
import { isDesktop, isMobile } from "react-device-detect";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useTranslation } from "react-i18next";
import BuyReport from "../leftDrawerComponents/buyReport/BuyReport";
import { useSelector, useDispatch } from "react-redux";
import {
  constitutionChosen,
  closeModal,
  searchArrayLocation,
  setBussinessLocation,
  entityChosen,
} from "../../../slices/buyReportSlice";
import {
  SucessMessage,
  InProcessMessage,
  ErrorMessage,
} from "../reusable/StatusReports";
const globe = <FontAwesome5 name={"globe"} color="white" size={15.83} />;
const check = <FontAwesome5 name={"check"} color="green" size={15.83} />;
import AddMonitoring from "../leftDrawerComponents/addMonitoring/AddMonitoring";
import ETRMonitoringReport from "../leftDrawerComponents/viewMonitoring/eTRMonitoringReport";
import {
  setActiveDrawer,
  setSubActiveOption,
  setDashHeader,
} from "../../../slices/drawerSlice";
import { reports } from "../../../slices/infoSlice";
import { errorModel } from "../../../slices/buyReportSlice";
import { clearSearchResult } from "../../../slices/buyReportSlice";

function CustomModal({
  modalVisible,
  setModalVisible,
  name,
  showButton,
  modalId,
  contentData,
  navigation,
  index,
  setIndex,
  tncData,
}) {
  const dispatch = useDispatch();

  const [showValidate, setShowValidate] = useState(false);
  const { visibleModel, errorvalue } = useSelector((state) => state.buyReport);

  let Modalname;
  errorvalue == "none"
    ? (setModalVisible(false),
      (name = null),
      (modalId = null),
      dispatch(errorModel(null)))
    : errorvalue;

  if (name) {
    Modalname = name;
  } else {
    showButton = showButton;
  }

  if (modalId === undefined && name === "Buy Report") {
    modalId = "buy_report";
  }
  if (modalId === undefined && name === "Add Monitoring") {
    modalId = "add_monitoring";
  }

  var width; //full width
  var height; //full height
  let size = "";
  let placement = "desktop";
  if (isMobile) {
    width = "100%";
    placement = "mobile";
    size = "full";
    var height = Dimensions.get("window").height;
  } else if (isDesktop) {
    placement = "desktop";
    width = "430px";
    var height = Dimensions.get("window").height - 71;
    size = "";
  }
  const handleSizeClick = () => {
    setModalVisible(!modalVisible);
  };

  const movetoNext = () => {
    navigation.navigate("Reports");
    dispatch(setActiveDrawer(1));
    dispatch(setSubActiveOption(0));
    dispatch(setDashHeader(false));
    dispatch(reports());
  };
  const handleclick = () => {
    setModalVisible(!modalVisible);
    // setIndex(0);

    modalId == "add_monitoring" ? null : dispatch(clearSearchResult());
  };

  const styles = {
    desktop: {
      marginLeft: "auto",
      marginTop: 70,
      width: width,
      backgroundColor: "#F6F6F6",
    },
    mobile: {
      marginTop: 130,
    },
    bottom: {
      marginBottom: 0,
      marginTop: "auto",
      width: width,
      backgroundColor: "#F6F6F6",
    },
  };
  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={handleclick}
        backdropVisible={true}
        size={size}
      >
        <Modal.Content maxH={height} {...styles[placement]} borderRadius={0}>
          <Modal.CloseButton />
          <Modal.Header borderColor={"#F6F6F6"} bg={"#F6F6F6"}>
            {showValidate ? (
              <FontAwesome5
                name={"arrow-left"}
                color="grey"
                size={15.83}
                onPress={() => setShowValidate(false)}
              />
            ) : null}

            <Heading size="sm" textAlign={"center"}>
              {Modalname}
            </Heading>
          </Modal.Header>
          <Modal.Body _scrollview={{ scrollEnabled: true }} p={0}>
            <View h={height}>
              {modalId == "buy_report" ? (
                <BuyReport
                  setShowValidate={setShowValidate}
                  showValidate={showValidate}
                  height={height}
                  index={index}
                  setIndex={setIndex}
                />
              ) : modalId == "add_monitoring" ? (
                <AddMonitoring />
              ) : modalId == "view_monitoring" ? (
                <ETRMonitoringReport tncData={tncData} contentData={contentData} />
              ) : (
                " "
              )}
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      {visibleModel ? (
        <Modal isOpen={modalVisible} onClose={handleclick} size={size}>
          <Modal.Content maxH={height} {...styles[placement]} borderRadius={0}>
            <Modal.Body _scrollview={{ scrollEnabled: false }} p={0}>
              <View h={height} alignItems={"center"}>
                {errorvalue == "success" ? <SucessMessage /> : null}
                {errorvalue == "progress" ? <InProcessMessage /> : null}
                {errorvalue == "failure" ? <ErrorMessage /> : null}
              </View>
            </Modal.Body>
            {errorvalue != "success" && errorvalue != "null" ? (
              <Modal.Footer style={{ borderTopWidth: 0 }}>
                <Button
                  size="sm"
                  borderRadius="sm"
                  colorScheme="primary"
                  variant="primary"
                  flex="1"
                  onPress={() => movetoNext()}
                >
                  {errorvalue == "failure" ? "Try Again" : "Go to Report"}
                </Button>
              </Modal.Footer>
            ) : null}
          </Modal.Content>
        </Modal>
      ) : null}

      {showButton ? (
        <View mb={6}>
          <Flex direction="row" mb={6}>
            <Spacer />
            <Button mt="2" variant="primary" onPress={() => handleSizeClick()}>
              {Modalname}
            </Button>
          </Flex>
        </View>
      ) : (
        ""
      )}
    </>
  );
}

function InfoModal() {
  const [isshow, setisShow] = useState(true);

  var width; //full width
  var height; //full height
  let size = "";
  let placement = "desktop";
  if (isMobile) {
    width = "100%";
    placement = "mobile";
    size = "full";
    var height = Dimensions.get("window").height;
  } else if (isDesktop) {
    placement = "desktop";
    width = "400px";
    var height = Dimensions.get("window").height - 71;
    size = "";
  }

  const hideModel = () => {
    setisShow(false);
  };

  const styles = {
    desktop: {
      marginLeft: "auto",
      marginTop: 70,
      width: width,
      backgroundColor: "#F6F6F6",
    },
    mobile: {
      marginTop: 130,
    },
    bottom: {
      marginBottom: 0,
      marginTop: "auto",
      width: width,
      backgroundColor: "#F6F6F6",
    },
  };
  return (
    <>
      <Modal
        isOpen={isshow}
        onClose={() => hideModel}
        borderRadius={2}
        size={size}
        p={5}
      >
        <Modal.Content maxH={height} {...styles[placement]} borderRadius={0}>
          <Modal.Header borderColor={"#F6F6F6"} bg={"#F6F6F6"} p={4}>
            <Heading size="sm" textAlign={"center"}>
              Insufficient Balance
            </Heading>
          </Modal.Header>
          <Modal.Body _scrollview={{ scrollEnabled: false }} p={4}>
            <Center>
              <Text fontSize={"xs"}>
                Your account has insufficient prepaid balance or below the
                minimum requirement of credit balance to proceed further.
                {"\n"}
                {"\n"}
                Please top up to proceed.
              </Text>

              <Box bgColor={"#F1F1F1"}>
                <Text fontSize={"xs"}>
                  If you’re not using direct debit, please proceed with the
                  following steps of payment according to the Credit Manager
                  invoice(s):
                  {"\n"}
                  {"\n"}
                </Text>

                <Text fontSize={"xs"}>
                  For Credit Manager: {"\n"}
                  1. Bank in your outstanding amount to the following account:
                  {"\n"}
                  a. Bank Name: CIMB Bank Berhad{"\n"}
                  b. Bank Account Holder Name: CTOS Data Systems Sdn Bhd{"\n"}
                  c. Bank Account Number: 8001 093 738{"\n"}
                  d. Recipient Reference: Company Code{"\n"}
                  e. Other Payment Details: Month of Invoice Paid eg. MAY 2017
                  {"\n"}
                  2. Kindly email your slip to finance@ctos.com.my or fax it to
                  03-2722 8868.{"\n"}
                </Text>
              </Box>
            </Center>
          </Modal.Body>

          <Modal.Footer style={{ borderTopWidth: 0 }}>
            <Button
              size="sm"
              borderRadius="sm"
              colorScheme="primary"
              variant="primary"
              flex="1"
              onPress={() => hideModel()}
            >
              Understand
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}

function ReportBuyingOption() {
  const {
    showConstitutionModal,
    constitutionOption,
    showBussinessLocationModal,
    tempLocation,
    showOtherEntityModal,
  } = useSelector((state) => state.buyReport);
  const [searchLocation, setSearchLocation] = useState("");
  let filteredLocation = tempLocation;
  const dispatch = useDispatch();
  var width; //full width
  var height; //full height
  let size = "";
  let placement = "desktop";
  if (isMobile) {
    width = "100%";
    placement = "mobile";
    size = "full";
    var height = Dimensions.get("window").height;
  } else if (isDesktop) {
    placement = "desktop";
    width = "430px";
    var height = Dimensions.get("window").height - 71;
    size = "";
  }
  const styles = {
    desktop: {
      marginLeft: "auto",
      marginTop: 70,
      width: width,
    },
    mobile: {
      marginTop: 130,
    },
    bottom: {
      marginBottom: 0,
      marginTop: "auto",
      width: width,
    },
  };
  const searchFilterFunction = (text) => {
    setSearchLocation(text);
    dispatch(searchArrayLocation(text));
  };

  const handleBussinessLocation = (location) => {
    setSearchLocation("");
    dispatch(setBussinessLocation(location));
  };

  return (
    <>
      <Modal
        isOpen={
          showConstitutionModal ||
          showBussinessLocationModal ||
          showOtherEntityModal
        }
        onClose={() => dispatch(closeModal())}
        size={size}
      >
        <Modal.Content maxH={height} {...styles[placement]} borderRadius={0}>
          <Modal.CloseButton />
          <Modal.Header borderColor={"white"} textAlign={"center"}>
            <Heading size="sm">
              {showConstitutionModal ? "Select Constitution" : null}
              {showBussinessLocationModal ? "Select Location" : null}
              {showOtherEntityModal ? "Select Entity" : null}
            </Heading>
          </Modal.Header>
          <Modal.Body _scrollview={{ scrollEnabled: false }} p={0}>
            <View h={height}>
              {showConstitutionModal ? (
                <View>
                  {constitutionOption.map(function (i, id) {
                    return (
                      <Button
                        variant="unstyled"
                        borderBottomWidth={1}
                        borderColor={"#E1E1E1"}
                        key={id}
                        justifyContent={"left"}
                        onPress={() => dispatch(constitutionChosen(i.option))}
                      >
                        {i.option}
                      </Button>
                    );
                  })}
                </View>
              ) : null}

              {showBussinessLocationModal ? (
                <View px={4}>
                  <Input
                    my={4}
                    placeholder="Search for location"
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={searchLocation}
                  />
                  {filteredLocation.map(function (i, id) {
                    return (
                      <Button
                        variant="unstyled"
                        borderBottomWidth={1}
                        borderColor={"#E1E1E1"}
                        key={id}
                        justifyContent={"left"}
                        onPress={() => handleBussinessLocation(i.name)}
                      >
                        {i.name}
                      </Button>
                    );
                  })}
                </View>
              ) : null}

              {showOtherEntityModal ? (
                <View>
                  <Button
                    variant="unstyled"
                    borderBottomWidth={1}
                    borderColor={"#E1E1E1"}
                    justifyContent={"left"}
                    onPress={() => dispatch(entityChosen("Audit Firm"))}
                  >
                    Audit Firm
                  </Button>
                  <Button
                    variant="unstyled"
                    borderBottomWidth={1}
                    borderColor={"#E1E1E1"}
                    justifyContent={"left"}
                    onPress={() => dispatch(entityChosen("Association"))}
                  >
                    Association
                  </Button>
                </View>
              ) : null}
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}

function CustomLanguageModal() {
  const { t, i18n } = useTranslation();
  const [placement, setPlacement] = useState();
  const [open, setOpen] = useState(false);

  const openModal = (placement) => {
    setOpen(true);
    setPlacement(placement);
  };
  return (
    <View>
      <Text onPress={() => openModal("bottom")}>{globe}</Text>
      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content {...styles[placement]} borderRadius={0} w={"100%"}>
          <Modal.Header>
            <View alignItems={"end"}>
              <Button
                variant="ghost"
                colorScheme="red"
                textDecoration={"underline"}
                textDecorationColor={"#ff0000"}
                onPress={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </View>
          </Modal.Header>

          <Modal.Body p={0}>
            <Menu.Item
              onPress={() => i18n.changeLanguage("en")}
              borderBottomWidth="1"
              borderColor="#E1E1E1"
              p={4}
            >
              English{" "}
              {i18n.language === "en" ? (
                <Text position={"absolute"} right={3}>
                  {check}
                </Text>
              ) : (
                ""
              )}
            </Menu.Item>
            <Menu.Item
              onPress={() => i18n.changeLanguage("my")}
              borderBottomWidth="1"
              borderColor="#E1E1E1"
              p={4}
            >
              Bahasa Malaysia{" "}
              {i18n.language === "my" ? (
                <Text position={"absolute"} right={3}>
                  {check}
                </Text>
              ) : (
                ""
              )}
            </Menu.Item>
            <Menu.Item
              onPress={() => i18n.changeLanguage("ch")}
              borderBottomWidth="1"
              borderColor="#E1E1E1"
              p={4}
            >
              简体中文{" "}
              {i18n.language === "ch" ? (
                <Text position={"absolute"} right={3}>
                  {check}
                </Text>
              ) : (
                ""
              )}
            </Menu.Item>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
}

const styles = {
  bottom: {
    marginBottom: 0,
    marginTop: "auto",
  },
};

export { CustomModal, CustomLanguageModal, ReportBuyingOption, InfoModal };
