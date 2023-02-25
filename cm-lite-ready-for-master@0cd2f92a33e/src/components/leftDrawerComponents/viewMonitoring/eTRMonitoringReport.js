import {
  View,
  Text,
  Box,
  Button,
  Heading,
  Flex,
  Icon,
  FlatList,
  Pressable,
} from "native-base";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getMethodWithParams } from "../../../services/apiCalls";
import { Entypo } from "@expo/vector-icons";
import RenderHTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { removeElement } from "domutils";

export default function eTRMonitoringReport(props) {
  const [index, setIndex] = useState(0);
  const { userInfo } = useSelector((state) => state.user);
  const [showTncContent, setShowTncContent] = useState(false);
  const [showChevron, setShowChevron] = useState(false);

  const showTNCBox = () => {
    setShowTncContent(!showTncContent);
    setShowChevron(!showChevron);
  };

  const content_tnc = [
    {
      desc: "a) The reference is given to you in strict confidence and meant only.",
    },
    {
      desc: "b) You shall not circulate, inform or disseminate the reference to other party including the subject concerned unless we indicate otherwise.",
    },
    {
      desc: "c) You use the information at your own risk. We are not responsible or liable for any loss damage, if any, that you may suffer as a result.",
    },
    {
      desc: "d) You have a legitimate interest to receive our reference. That is to say to you or your company are/is about to deal or have dealings with your subjects of enquiry and are seeking for information on the same.",
    },
    {
      desc: "e) If you choose to repeat, distribute, disseminate our reference without our explicit consent, you shall be fully responsible for any consequences that may arise as a result.",
    },
    {
      desc: "f) The reference given to you may be and/or have been updated, changed, suppressed and/or removed after completion of investigation for dispute raised by Subject.",
    },
  ];

  const etr_detail_html = props.tncData.tnc;
  const { htmlwidth } = useWindowDimensions();
  const tagsStyles = {
    table: {
      marginBottom: "40px",
    },
    tr: {
      marginBottom: "10px",
    },
    b: {
      fontSize: "16px",
    },
  };

  const onElement = function (element) {
    // Remove the second table tag that contain term of condition.
    if (element.tagName === "table" && !element.attribs["cellpadding"]) {
      removeElement(element);
    }

    if (element.tagName === "p" || element.tagName === "br") {
      removeElement(element);
    }
  };

  const onText = function (text) {
    text.data = text.data.replace(
      "Terms and Condition for Receipt of Our Trade Reference ",
      ""
    );
  };

  const domVisitors = {
    onElement: onElement,
    onText: onText,
  };

  const viewMonitoringReport = function (input) {
    let view_report_params = {
      username: userInfo[0].name,
      api_token: userInfo[0].apiToken,
      report_uid: props.contentData.report_uid,
      bsr: props.tncData.bsr,
      is_agree: 1,
    };

    getMethodWithParams("viewETRLegalMonitoringReport", view_report_params)
      .then((response) => {
        try {
          var html = response.data;
          var uri = "data:text/html," + encodeURIComponent(html);
          var newWindow = window.open(uri);
          newWindow.document.write(html);
        } catch (e) {
          // console.log(e);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <>
      <Box p={4} bg={"gray.300"}>
        <RenderHTML
          contentWidth={htmlwidth}
          source={{ html: etr_detail_html }}
          tagsStyles={tagsStyles}
          domVisitors={domVisitors}
        />
      </Box>

      <View p={4}>
        <Text>
          We acknowledge your request for a trade reference of the above.
        </Text>
        <Box mt={5}>
          <Flex
            direction="row"
            bgColor={"gray.400"}
            justifyContent={"space-between"}
            alignItems={"center"}
            borderRadius={"6px"}
            py={"16px"}
            px={"20px"}
          >
            <Heading fontSize={"16px"}>Term and Conditions</Heading>
            <Pressable onPress={() => showTNCBox()}>
              {!showChevron ? (
                <Icon as={<Entypo name="chevron-down" />} size="md" />
              ) : (
                <Icon as={<Entypo name="chevron-up" />} size="md" />
              )}
            </Pressable>
          </Flex>

          {showTncContent ? (
            <View p={"20px"} bgColor={"#fff"}>
              <Text lineHeight={"21px"} mb={"13px"}>
                We will provide you a reference on the following condition:
              </Text>
              <FlatList
                data={content_tnc}
                keyExtractor={(item, index) => "key" + index}
                renderItem={({ item }) => (
                  <Text lineHeight={"21px"} mb={"10px"}>
                    {item.desc}
                  </Text>
                )}
              />
            </View>
          ) : (
            ""
          )}
        </Box>
      </View>

      <Box p={4}>
        <Text mb={3}>
          By clicking the "Agree" button, you agree and accept the Terms &
          Conditions above.
        </Text>
        <Button onPress={() => viewMonitoringReport()}>Agree</Button>
      </Box>
    </>
  );
}
