import { View, Text, Box, HStack, Center, Divider } from "native-base";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { isMobile } from "react-device-detect";
import Step1 from "./Step1";
import Step2 from "./Step2";

export default function AddMonitoring({ setShowValidate, showValidate }) {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: "first", title: "1" },
    { key: "second", title: "2" },
  ]);
  // console.log("ADDMONITORING", index);
  const layout = useWindowDimensions();
  const FirstRoute = () => <Step1 setIndex={setIndex} />;
  const SecondRoute = () => <Step2 setIndex={setIndex} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => {
    return (
      <View p={4}>
        <Divider thickness="2" my={1} bg={"#E1E1E1"} />
        <HStack>
          {props.navigationState.routes.map((route, i) => {
            if (isMobile) {
              return (
                <Box
                  key={i}
                  h={"30px"}
                  w={"30px"}
                  bg={index == i ? "primary.500" : "#E1E1E1"}
                  pt={1}
                  rounded={"30px"}
                  mb={4}
                  ml={"27%"}
                  mt={"-6%"}
                >
                  <Center>
                    <Text color={"white"}>{route.title}</Text>
                  </Center>
                </Box>
              );
            } else {
              return (
                <Box
                  key={i}
                  h={"30px"}
                  w={"30px"}
                  pt={1}
                  rounded={"30px"}
                  mb={2}
                  ml={"27%"}
                  mt={"-5%"}
                  bg={index == i ? "primary.500" : "#E1E1E1"}
                >
                  <Center>
                    <Text color={"white"}>{route.title}</Text>
                  </Center>
                </Box>
              );
            }
          })}
        </HStack>
      </View>
    );
  };

  return (
    <View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
        swipeEnabled={false}
      />
    </View>
  );
}
