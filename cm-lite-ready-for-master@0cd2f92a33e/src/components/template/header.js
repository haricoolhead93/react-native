import { Dimensions } from "react-native";
import { isMobile, isDesktop } from "react-device-detect";
import { CustomLanguageModal } from "./customModal";

import {
  View,
  Flex,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  Heading,
  Pressable,
  Menu,
} from "native-base";
import React from "react";
import IconFeather from "react-native-vector-icons/Feather";
// icon
const arrowRight = <FontAwesome5 name={"arrow-right"} color="#007b85" />;
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useDispatch, useEffect } from "react-redux";
import { setSearchHeader, setWidth } from "../../../slices/drawerSlice";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-web";

const exchangeAlt = (
  <FontAwesome5 name={"exchange-alt"} color="white" size={15.83} />
);
const globe = <FontAwesome5 name={"globe"} color="white" size={15.83} />;
const powerOff = <FontAwesome5 name={"power-off"} color="white" size={15.83} />;
const search = <FontAwesome5 name={"search"} color="white" size={15.83} />;
const close = <FontAwesome5 name={"times"} color="white" size={15.83} />;

//mobile customised
function ImageHeader() {
  var width = Dimensions.get("window").width; //full width
  const { headerDash } = useSelector((state) => state.drawer);
  const { isMobileDimension } = useSelector((state) => state.user);
  const { isResize } = useSelector((state) => state.user);

  // alert("in header" + isMobileDimension);

  if (isMobileDimension && headerDash) {
    return (
      <View
        style={{
          height: headerDash ? 228 : 72,
          justifyContent: "flex-end",
          padding: 5,
          backgroundColor: "transparent",
        }}
      >
        {headerDash ? (
          <Image
            style={{
              width: width,
              height: 228,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            source={require("../../../assets/image/handshake-mobile.png")}
            resizeMode="cover"
          />
        ) : (
          ""
        )}
      </View>
    );
  } else {
    return (
      <View
        style={{
          height: 72,
          justifyContent: "flex-end",
          padding: 5,
          backgroundColor: "#007B85",
        }}
      ></View>
    );
  }
}

function HeaderLeftOptions({
  shouldShow,
  setShouldShow,
  shouldToggle,
  setShouldToggle,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { headerDash } = useSelector((state) => state.drawer);
  const { isMobileDimension } = useSelector((state) => state.user);
  const { isResize } = useSelector((state) => state.user);

  function WithoutLogoButton() {
    return (
      <View>
        <Button mx={4} variant="icon" onPress={() => onPressButton()}>
          {arrowRight}
        </Button>
      </View>
    );
  }
  function onPressButton() {
    setShouldShow(!shouldShow);
    dispatch(setWidth(shouldShow));
  }

  function WithlogoButton() {
    const { isMobileDimension } = useSelector((state) => state.user);
    const { isResize } = useSelector((state) => state.user);
    const { t, i18n } = useTranslation();
    function toggleNavigator() {
      navigation.dispatch(DrawerActions.toggleDrawer());
      shouldToggle = !shouldToggle;
      if (isMobileDimension) {
        setShouldToggle(shouldToggle);
      }
    }
    if (!isMobileDimension) {
      if (isResize) {
        return (
          <View>
            <HStack>
              <Flex direction="row" alignItems={"flex-start"}>
                <Button
                  bg={"transparent"}
                  variant="icon"
                  onPress={() => toggleNavigator()}
                >
                  <IconFeather name="menu" size={18} color="#ffffff" />
                </Button>
              </Flex>
            </HStack>
          </View>
        );
      } else {
        return (
          <View>
            <Flex direction="row" alignItems={"center"}>
              <Image
                source={require("../../../assets/image/ctos-full-logo.png")}
                alt="ctos"
                width={"250px"}
                height={"10"}
              />
              <Button mx={0} variant="icon" onPress={() => onPressButton()}>
                <IconFeather name="menu" size={18} color="#007b85" />
              </Button>
            </Flex>
          </View>
        );
      }
    } else if (isMobileDimension && !headerDash) {
      return (
        <View>
          <HStack>
            <Flex direction="row" alignItems={"flex-start"}>
              <Button
                bg={"transparent"}
                variant="icon"
                onPress={() => toggleNavigator()}
              >
                <IconFeather name="menu" size={18} color="#ffffff" />
              </Button>
            </Flex>
          </HStack>
        </View>
      );
    } else {
      return (
        <View>
          <HStack>
            <Flex direction="row" alignItems={"flex-start"}>
              <Button
                bg={"transparent"}
                variant="icon"
                onPress={() => toggleNavigator()}
              >
                <IconFeather name="menu" size={18} color="#ffffff" />
              </Button>
            </Flex>
            <VStack paddingTop={2}>
              <Text color="white" fontSize="sm" mx={2}>
                {t("general_greeting")}
                <Heading color="white" size="sm" paddingX={2}>
                  John Doe
                </Heading>
              </Text>
              <Text color="white" fontSize="sm" mx={2}>
                Really Relaxing Sdn Bhd
              </Text>

              <Text color="white" fontSize="sm" mx={2} paddingTop={5}>
                {t("header_available_balance")}:{" "}
              </Text>
              <Heading color="white" size="sm" mx={2}>
                RM 90.00
              </Heading>
            </VStack>
          </HStack>
        </View>
      );
    }
  }

  return <View>{shouldShow ? <WithlogoButton /> : <WithoutLogoButton />}</View>;
}

function HeaderRightOptions() {
  const { headerDash } = useSelector((state) => state.drawer);
  const { t, i18n } = useTranslation();
  const { isMobileDimension } = useSelector((state) => state.user);
  const { isResize } = useSelector((state) => state.user);
  const [showSearchIcon, setshowSearchIcon] = React.useState(false);

  const dispatch = useDispatch();

  function onPress() {
    setshowSearchIcon(!showSearchIcon);
    dispatch(setSearchHeader(!showSearchIcon));
  }

  if (!isMobileDimension) {
    if (isResize) {
      return (
        <View>
          <HStack py="2" flex={1} space={2} my={3} mx={3} alignItems="center">
            {exchangeAlt}
            <CustomLanguageModal />
            {powerOff}
          </HStack>
        </View>
      );
    } else {
      return (
        <View>
          <Flex direction="row" alignItems={"center"}>
            <Flex direction="row">
              <Text color="white" fontSize="sm">
                {t("header_available_balance")}:{" "}
              </Text>
              <Heading color="white" size="sm">
                RM 90.00
              </Heading>
            </Flex>
            <Text mx={4} color="white">
              {" "}
              |{" "}
            </Text>
            <Text color="white" fontSize="sm" mx={2}>
              {t("header_full_credit_manager")} {exchangeAlt}
            </Text>
            <Text mx={4} color="white">
              {" "}
              |{" "}
            </Text>
            <Menu
              w="190"
              trigger={(triggerProps) => {
                return (
                  <Pressable {...triggerProps}>
                    <Text color="white" fontSize="sm">
                      {t("header_language")} {globe}
                    </Text>
                  </Pressable>
                );
              }}
            >
              <Menu.Item onPress={() => i18n.changeLanguage("en")}>
                English
              </Menu.Item>
              <Menu.Item onPress={() => i18n.changeLanguage("my")}>
                Bahasa Malaysia
              </Menu.Item>
              <Menu.Item onPress={() => i18n.changeLanguage("ch")}>
                简体中文
              </Menu.Item>
            </Menu>

            <Text mx={4} color="white">
              {" "}
              |{" "}
            </Text>
            <Text color="white" fontSize="sm" mx={2}>
              {t("header_logout")} {powerOff}
            </Text>
          </Flex>
        </View>
      );
    }
  } else if (isMobileDimension && !headerDash) {
    return (
      <View>
        <HStack py="2" flex={1} space={2} my={3} mx={3} alignItems="center">
          {!showSearchIcon ? (
            <>
              <TouchableOpacity onPress={onPress}>{search}</TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={onPress}>{close}</TouchableOpacity>
          )}
        </HStack>
      </View>
    );
  } else {
    return (
      <View>
        <HStack py="2" flex={1} space={2} my={3} mx={3} alignItems="center">
          {exchangeAlt}
          <CustomLanguageModal />
          {powerOff}
        </HStack>
      </View>
    );
  }
}

export { ImageHeader, HeaderLeftOptions, HeaderRightOptions };
