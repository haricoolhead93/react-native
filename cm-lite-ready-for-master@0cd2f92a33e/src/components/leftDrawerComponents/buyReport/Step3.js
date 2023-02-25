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
import { InfoModal } from "../../template/customModal";
import { buyReportModel, errorModel } from "../../../../slices/buyReportSlice";
import { REACT_NATIVE_APP_BASE_URL } from "@env";

export default function Step3() {
  const dispatch = useDispatch();
  const data = [
    { id: 1, value: "Archive Data (31/06/2022)", isFree: true },
    { id: 2, value: "Legal Case + eTR", isFree: false },
    { id: 3, value: "Add Credit File + Monitor", isFree: false },
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
    checkBalance();
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

  function fetchReports() {
    // let params = {
    //   username: userInfo[0].name,
    //   api_token: userInfo[0].apiToken,
    // };
    startLoading();
    let params = {
      custorguid: "d2c428a09bdcf523ac8989943a3d05f5",
      // username: "vignesh_ctos",
      //api_token: "028e60c77c309c701f6f77ef99fcf63f",
      username: userInfo[0].name,
      api_token: userInfo[0].apiToken,
      type: [
        {
          ccm_cpo: [
            true,
            {
              name: "GUNUNG RIA (M) SDN BHD",
              company_no: "200801021097",
              ref_no: "",
              request_type: "402828b307b2aafd0107b2ab06b2001d",
              area: "",
              address: "",
              media_types: [{ media_type_code: "0", charge_type: "2" }],
              add_to_creditfile: false,
              report_name: "CCM Report",
              charge_type: "2",
              is_monitored: false,
            },
          ],
        },
      ],
    };

    {
      isLoading
        ? (dispatch(buyReportModel()), dispatch(errorModel("progress")))
        : null;
    }

    PostAlternative("buyReport", params)
      .then((response) => {
        if (response && response.data?.status) {
          let dataResp = response.data.reports_requested;

          dispatch(buyReportModel());
          dispatch(errorModel("success"));

          setTimeout(() => {
            callReportView();
            dispatch(errorModel("none"));
            dispatch(buyReportModel());
          }, 3000);
        } else {
          dispatch(buyReportModel());
          dispatch(errorModel("failure"));
        }
      })
      .catch((err) => {
        //console.log("hi err", err);
      });
  }

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
          Step3
        </Heading>

        <Text fontSize="sm" mb={4}>
          Confirm Purchase
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
              <Text fontSize="xs" mb={1} bold>
                {`\u2022 ${item.value}`}
              </Text>

              <Spacer />

              {item.isFree ? (
                <Badge
                  alignItems="flex-end"
                  size="sm"
                  variant="solid"
                  borderRadius="sm"
                  colorScheme="primary"
                >
                  FREE
                </Badge>
              ) : null}
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
            Add <Text bold> Credit File </Text>and
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
          onPress={() => fetchReports()}
        >
          Buy and View Report
        </Button>
      </Box>

      {isInfoModel ? <InfoModal /> : null}
    </View>
  );
}
