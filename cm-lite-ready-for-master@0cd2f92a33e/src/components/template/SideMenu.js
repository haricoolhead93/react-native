import {
  Spacer,
  Link,
  Box,
  View,
  StatusBar,
  HStack,
  Text,
  Icon,
  IconButton,
  Center,
} from "native-base";
import React, { useState } from "react";
import IconFoundation from "react-native-vector-icons/Foundation";
import IconCI from "react-native-vector-icons/MaterialCommunityIcons";
import IconFeather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { isMobile } from "react-device-detect";

import {
  setActiveDrawer,
  setSubActiveOption,
  setDashHeader,
  setReinforce,
} from "../../../slices/drawerSlice";
import { useTranslation } from "react-i18next";

import { reports, monitor, etr_submitted } from "../../../slices/infoSlice";

export default function SideMenuWeb(props, shouldToggle, setShouldToggle) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const sideMenu = props.sideMenu;
  const toggleText = props.toggleText;
  const { activedrawer } = useSelector((state) => state.drawer);
  const { subActiveOption } = useSelector((state) => state.drawer);
  const { Reinforce } = useSelector((state) => state.drawer);
  const [changeChevIcon, setChangeChevIcon] = useState(true);
  const activeSideMenu = activedrawer;
  const active = {
    backgroundColor: "#F4F6FA",
    borderLeft: "4px solid #007b85",
  };
  const inactive = {};

  const { isMobileDimension } = useSelector((state) => state.user);

  const showReinforce = function () {
    setChangeChevIcon(!changeChevIcon);
    dispatch(setActiveDrawer(3));
    dispatch(setReinforce(!Reinforce));
  };

  function OpenReinforce() {
    if (Reinforce) {
      dispatch(setReinforce(false));
      dispatch(setSubActiveOption(null));
    }
  }
  return (
    <View style={{ flex: 1 }}>
      {isMobileDimension ? (
        <AppBar
          props={props}
          shouldToggle={shouldToggle}
          setShouldToggle={setShouldToggle}
        />
      ) : (
        <View></View>
      )}
      <Box w={sideMenu} bg={"white"}>
        <Link
          onPress={() => {
            dispatch(setActiveDrawer(0));
            props.navigation.navigate("Dashboard");
            props.setShouldToggle(false);
            dispatch(setDashHeader(true));
            OpenReinforce();
          }}
          alignItems={"center"}
          px={"25px"}
          py={"20px"}
          cursor={"pointer"}
          gap={5}
          style={activeSideMenu == 0 ? active : inactive}
        >
          <IconFoundation
            name="monitor"
            size={16}
            color={activeSideMenu == 0 ? "#007b85" : "#797979"}
          />
          {toggleText ? (
            <Text
              color={activeSideMenu == 0 ? "primary.500" : "primary.1000"}
              fontSize={"16px"}
            >
              {t("sidemenu_dashboard")}
            </Text>
          ) : (
            ""
          )}
        </Link>

        <Link
          onPress={() => {
            dispatch(setActiveDrawer(1));
            dispatch(setDashHeader(false));
            dispatch(reports());
            props.navigation.navigate("Reports");
            props.setShouldToggle(false);
            OpenReinforce();
          }}
          alignItems={"center"}
          px={"25px"}
          py={"20px"}
          cursor={"pointer"}
          gap={5}
          style={activeSideMenu == 1 ? active : inactive}
        >
          <IconCI
            name="file-document-outline"
            size={16}
            color={activeSideMenu == 1 ? "#007b85" : "#797979"}
          />
          {toggleText ? (
            <Text
              color={activeSideMenu == 1 ? "primary.500" : "primary.1000"}
              fontSize={"16px"}
            >
              {t("sidemenu_report")}
            </Text>
          ) : (
            ""
          )}
        </Link>

        <Link
          onPress={() => {
            dispatch(setActiveDrawer(2));
            dispatch(monitor());
            dispatch(setDashHeader(false));
            props.navigation.navigate("Monitor");
            props.setShouldToggle(false);
            OpenReinforce();
          }}
          alignItems={"center"}
          px={"25px"}
          py={"20px"}
          cursor={"pointer"}
          gap={5}
          style={activeSideMenu == 2 ? active : inactive}
        >
          <IconCI
            name="target"
            size={16}
            color={activeSideMenu == 2 ? "#007b85" : "#797979"}
          />
          {toggleText ? (
            <Text
              color={activeSideMenu == 2 ? "primary.500" : "primary.1000"}
              fontSize={"16px"}
            >
              {t("sidemenu_monitor")}
            </Text>
          ) : (
            ""
          )}
        </Link>

        <Link
          onPress={showReinforce}
          alignItems={"center"}
          px={"25px"}
          py={"20px"}
          cursor={"pointer"}
          gap={5}
          style={activeSideMenu == 3 ? active : inactive}
        >
          <IconFeather
            name="refresh-ccw"
            size={16}
            color={activeSideMenu == 3 ? "#007b85" : "#797979"}
          />
          {toggleText ? (
            <>
              <Text
                color={activeSideMenu == 3 ? "primary.500" : "primary.1000"}
                fontSize={"16px"}
              >
                {t("sidemenu_reinforce")}
              </Text>
              <Spacer></Spacer>
              {changeChevIcon ? (
                <IconFeather
                  name="chevron-down"
                  size={16}
                  color={activeSideMenu == 3 ? "#007b85" : "#797979"}
                />
              ) : (
                <IconFeather
                  name="chevron-up"
                  size={16}
                  color={activeSideMenu == 3 ? "#007b85" : "#797979"}
                />
              )}
            </>
          ) : (
            ""
          )}
        </Link>

        {Reinforce ? (
          <Box>
            <Link
              onPress={() => {
                dispatch(setActiveDrawer(3));
                dispatch(setSubActiveOption(4));
                dispatch(etr_submitted());
                props.navigation.navigate("etrSubmit");
                props.setShouldToggle(false);
                dispatch(setDashHeader(false));
              }}
              alignItems={"center"}
              px={"25px"}
              py={"20px"}
              cursor={"pointer"}
              style={
                activeSideMenu == 3 && subActiveOption == 4 ? active : inactive
              }
            >
              {toggleText ? (
                <>
                  <Text
                    color={
                      activeSideMenu == 3 && subActiveOption == 4
                        ? "primary.500"
                        : "primary.1000"
                    }
                    fontSize={"16px"}
                    ml={"35px"}
                  >
                    {t("sidemenu_etr_submitted")}
                  </Text>
                </>
              ) : (
                ""
              )}
            </Link>
            <Link
              onPress={() => {
                dispatch(setActiveDrawer(3));
                dispatch(setSubActiveOption(5));
                dispatch(setDashHeader(false));
                props.navigation.navigate("etrReach");
                props.setShouldToggle(false);
              }}
              alignItems={"center"}
              px={"25px"}
              py={"20px"}
              cursor={"pointer"}
              style={
                activeSideMenu == 3 && subActiveOption === 5 ? active : inactive
              }
            >
              {toggleText ? (
                <>
                  <Text
                    color={
                      activeSideMenu == 3 && subActiveOption === 5
                        ? "primary.500"
                        : "primary.1000"
                    }
                    fontSize={"16px"}
                    ml={"35px"}
                  >
                    {t("sidemenu_etr_reached")}
                  </Text>
                </>
              ) : (
                ""
              )}
            </Link>
          </Box>
        ) : (
          ""
        )}
      </Box>

      <Text
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "#007B85",
          width: "100%",
          height: 40,
          paddingTop: 5,
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        Lite Version 1.0
      </Text>
    </View>
  );
}

function AppBar({ props }) {
  return (
    <>
      <StatusBar bg="#3700B3" barStyle="light-content" w="100%" />
      <Box safeAreaTop bg="007B85" />
      <HStack
        bg="#007B85"
        px="4"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack alignItems="center">
          <Text color="white" fontSize="20" fontWeight="bold">
            Menu
          </Text>
        </HStack>
        <HStack>
          <IconButton
            onPress={() => closeToggle(props)}
            icon={
              <Icon as={MaterialIcons} name="close" size="sm" color="white" />
            }
          />{" "}
        </HStack>
      </HStack>
    </>
  );

  function closeToggle(props) {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
    props.setShouldToggle(false);
  }
}
