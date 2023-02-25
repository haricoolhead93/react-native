import {
  View,
  Text,
  ScrollView,
  Box,
  Image,
  Center,
  Heading,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import List from "../../util/quickActionList";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  setActiveDrawer,
  setSubActiveOption,
  setDashHeader,
} from "../../../slices/drawerSlice";
import { isDesktop } from "react-device-detect";
import { reports, monitor, etr_submitted } from "../../../slices/infoSlice";
import LoaderSkeleton from "../reusable/LoaderSkeleton";
import { useSelector } from "react-redux";

export default function QuickActionCard({
  modalVisible,
  setModalVisible,
  modalName,
  setmodalName,
  modalId,
  setModalId,
}) {
  const dispatch = useDispatch();
  const { isMobileDimension } = useSelector((state) => state.user);
  const { isResize } = useSelector((state) => state.user);

  const { t, i18n } = useTranslation();
  let setDesktopWidth = 145;
  if (isMobileDimension) {
    setDesktopWidth = 150;
  }
  function callModal(i) {
    if (i.isModal) {
      setModalVisible(!modalVisible);
      setmodalName(i?.modalName);
      setModalId(i.modalId);
    } else {
      navigation.navigate(i.navigate);
      dispatch(setActiveDrawer(i.activeOption));
      dispatch(setSubActiveOption(i.subActive));
      dispatch(setDashHeader(false));

      // from quick action to invoke info data have to remove this fr mocking report data
      {
        i.text1 == "general_view_report"
          ? dispatch(reports())
          : i.text1 == "general_view_monitor"
          ? dispatch(monitor())
          : i.text1 == "general_view_etr_submitted"
          ? dispatch(etr_submitted())
          : null;
      }
    }
  }
  const navigation = useNavigation();
  return (
    <View>
      <Heading size="md" my={4} ml={6}>
        {t("general_quick_actions")}
      </Heading>
      <ScrollView
        horizontal
        mb={4}
        p={2}
        style={{ overflow: !isMobileDimension && !isResize ? "hidden" : "" }}
      >
        {List.map(function (i, id) {
          return (
            <TouchableOpacity key={id} onPress={() => callModal(i)}>
              <Box
                rounded={8}
                bg={"white"}
                w={setDesktopWidth}
                px={2}
                py={4}
                mx={3}
              >
                <Center>
                  <Image
                    source={i.image}
                    alt="icon"
                    width={"10"}
                    height={"10"}
                  />
                  <Text fontSize="sm" textAlign="center" mt={4}>
                    {t(i.text1)}
                    {/* {i.text1}
                    {"\n"} {i.text2} */}
                  </Text>
                </Center>
              </Box>
            </TouchableOpacity>

            //using this Loader to handle the API calls

            // <Box
            //   rounded={8}
            //   w={setDesktopWidth}
            //   px={2}
            //   py={4}
            //   mx={3} >
            //   <LoaderSkeleton typeVal={"Quick"}/>
            // </Box>
          );
        })}
      </ScrollView>
    </View>
  );
}
