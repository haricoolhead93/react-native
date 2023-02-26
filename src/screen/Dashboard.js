import { ImageBackground, View } from "react-native";
import { CustomModal } from "../components/template/customModal";
import QuickAction from "../components/template/QuickAction";
import React from "react";
import { isDesktop } from "react-device-detect";
import { Text, VStack, Heading, ScrollView, Center } from "native-base";
import { useTranslation } from "react-i18next";
import { login } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import PoliciesLink from "../components/template/PoliciesLink";
import { PostAlternative } from "../services/apiCalls";
import Spinner from "react-native-loading-spinner-overlay";
import { StyleSheet } from "react-native";

export default function Dashboard({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalName, setmodalName] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [modalId, setModalId] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  // dispatch(login());
  // initially to call login creds

  const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: "#FFF",
      textAlign: "center",
      alignItems: "center",
    },
  });

  callLogin();
  function callLogin() {
    let params = {
      username: "mlivect",
      password: "test1234",
    };

    PostAlternative("login", params)
      .then((response) => {
        if (response && response.data?.status) {
          let dataResp = response.data;
          dataResp.new_username = params.username;
          setLoading(false);
          dispatch(login(dataResp));
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  }

  return (
    <View p={2}>
      <ScrollView>
        <Spinner
          visible={loading}
          textContent={"Logging In"}
          textStyle={styles.spinnerTextStyle}
        />
        {isDesktop ? (
          <View
            style={{
              height: 146,
            }}
          >
            <ImageBackground
              source={require("../../assets/image/handshake.png")}
              style={{ width: "100%", height: 146 }}
            >
              <VStack paddingTop={10} size={30}>
                <Text color="white" fontSize="lg" mx={2}>
                  {t("general_greeting")}
                  <Heading color="white" size="sm" paddingX={2}>
                    John Doe
                  </Heading>
                </Text>
                <Text color="white" fontSize="lg" mx={2}>
                  Really Relaxing Sdn Bhd
                </Text>
              </VStack>
            </ImageBackground>
          </View>
        ) : (
          <View> </View>
        )}
        <QuickAction
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalName={modalName}
          setmodalName={setmodalName}
          modalId={modalId}
          setModalId={setModalId}
        />

        <CustomModal
          modalId={modalId}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          name={modalName}
          navigation={navigation}
          index={index}
          setIndex={setIndex}
        />
      </ScrollView>

      <View>
        <PoliciesLink />
      </View>
    </View>
  );
}
