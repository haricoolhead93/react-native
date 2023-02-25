import {
  View,
  Text,
  Heading,
  FlatList,
  Button,
  Link,
  Badge,
  Switch,
  HStack,
  Pressable,
  Box,
  Divider,
  Spacer,
} from "native-base";
import { Linking } from "react-native";
import React, { useState, useEffect } from "react";
import { PostAlternative } from "../../../services/apiCalls";
import { useSelector, useDispatch } from "react-redux";

export default function Step2({ setIndex }) {
  //sample data to check
  const dispatch = useDispatch();
  const data = [
    { id: 1, value: "Director (2)", isFree: true },
    { id: 2, value: "Shareholder (1)", isFree: false },
  ];
  const [isLoading, setisLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [isInfoModel, setisInfoModel] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);

  const startLoading = () => {
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
    }, 3000);
  };

  useEffect(() => {
    // checkBalance()
  }, []);

  function checkBalance() {
    let params = {
      username: userInfo[0].name,
      api_token: userInfo[0].apiToken,
    };

    PostAlternative("insufficientBalance", params)
      .then((response) => {
        if (response && response.data?.status) {
          let dataResp = response.data.global_settings.account;

          dataResp.map((item) => {
            let val = item.balance;

            val != undefined ? setTotalBalance(val) : null;
          });
        } else {
        }
      })
      .catch((err) => {
        //console.log("hi err", err);
      });
  }
  const showInfo = () => {
    setisInfoModel(true);
  };

  function callReportView() {
    let URL =
      REACT_NATIVE_APP_BASE_URL +
      "creditfile/api/download/ctos?username=" +
      userInfo[0].name +
      "&api_token=" +
      userInfo[0].apiToken +
      "&report_uid=" +
      "jhvghg";
    Linking.openURL(URL);
  }

  return (
    <View>
      <View px={4}>
        <Heading size="md" mb={2}>
          Step2
        </Heading>

        <Text fontSize="sm" mb={4}>
          Select Related Subject to Monitor
        </Text>
      </View>

      <Box p={2} px="5" bg={"#E1E1E1"}>
        <Heading size="xs" mb={1}>
          CTOS DATA SYSTEMS SDN. BHD.
        </Heading>

        <Text fontSize="xs" mb={2}>
          (199401030027 / 0315708X)
        </Text>

        <HStack space={2}>
          <Badge variant="solid" borderRadius="md" colorScheme="primary">
            Company
          </Badge>
        </HStack>

        <FlatList
          data={data}
          top="2"
          renderItem={({ item }) => (
            <HStack>
              <Text fontSize="xs" mb={1} color={"#007B85"} underline bold>
                {`\u2022 ${item.value}`}
              </Text>
            </HStack>
          )}
        />

        <Divider
          my="2"
          _light={{
            bg: "muted.300",
          }}
          _dark={{
            bg: "muted.800",
          }}
        />

        <HStack>
          <Text fontSize="xs" mb={2}>
            Available Balance
          </Text>
          <Spacer />
          <Text fontSize="xs" mb={2}>
            RM {totalBalance}
          </Text>
        </HStack>

        <HStack>
          <Pressable onPress={() => showInfo()}>
            <Text fontSize="xs" mb={2} color="#E73A3A">
              Insufficient Balance{" "}
              <Text size="3" color="#E73A3A" underline>
                Learn more
              </Text>
            </Text>
          </Pressable>

          <Spacer />
          <Text fontSize="xs" mb={2} color="#E73A3A">
            RM {totalBalance}
          </Text>
        </HStack>
      </Box>

      <Box p={1} px="5">
        <HStack>
          <Text fontSize="xs">
            Add <Text bold> related parties </Text>to
            <Text bold> Monitoring </Text>
          </Text>
          <Spacer />

          <Switch size="md" />
        </HStack>

        <Link
          size="xsm"
          isExternal
          _text={{
            color: "#007B85",
          }}
        >
          Learn more
        </Link>

        <Button
          size="sm"
          borderRadius="sm"
          colorScheme="primary"
          variant="primary"
        >
          Buy and View Report
        </Button>
      </Box>

      {isInfoModel ? <InfoModal /> : null}
    </View>
  );
}
