import {
  View,
  Text,
  HStack,
  Pressable,
  Badge,
  ScrollView,
  Icon,
  Skeleton,
  VStack,
} from "native-base";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import Alert from "../components/reusable/Alert";
import StatusCard from "../components/reusable/StatusCard";
import Listing from "../components/reusable/Listing";
// import { monitorListColumn } from "../util/TableHeaderColumn";
import { useSelector } from "react-redux";
import { isDesktop } from "react-device-detect";
import ListingFLatList from "../components/reusable/ListingFLatList";
import { CustomModal } from "../components/template/customModal";
import {
  mockData,
  relationshipObj,
} from "../components/reusable/MockDataTemplate";
import { dateFormatter, showToastMessage } from "../util/UtilityFunction";
import PoliciesLink from "../components/template/PoliciesLink";
import { useState, useEffect } from "react";
import { Linking } from "react-native";
import { getMethodWithParams } from "../services/apiCalls";
import { REACT_NATIVE_APP_BASE_URL } from "@env";

export default function Monitor() {
  //set today date and 30 days backward by default
  let today = new Date();
  let priorDate = new Date(new Date().setDate(today.getDate() - 30));

  const { infoStatus, infoData } = useSelector((state) => state.info);
  const { userInfo, userStatus } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [monitoringData, setMonitoringData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [individualData, setIndividualData] = useState({});
  const [totalCountUnread, setTotalCountUnread] = useState(0);
  const [totalList, setTotalList] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [statusCount, setStatusCount] = useState(infoStatus);
  // let status = infoStatus;
  const [startdate, setStartDate] = useState(dateFormatter(priorDate));
  const [enddate, setEndDate] = useState(dateFormatter(today));
  const [searchParam, setSearchParam] = useState("");
  const [tncData, setTncData] = useState({});

  let params = {
    username: userInfo[0].name,
    api_token: userInfo[0].apiToken,
    page_number: currentPage,
    records_per_page: 10,
    start_date: startdate,
    end_date: enddate,
    name:searchParam,
  };

  let statistic_params = {
    username: userInfo[0].name,
    api_token: userInfo[0].apiToken,
    summary_type: "monitor_sum",
  };

  // mockdata for skeleton have to reconfigure and fetch from slice
  let mockdata = mockData;

  //set function for loading when the data table change
  const handleTableChange = (type, { page, sizePerPage }) => {
    setMonitoringData(mockdata);
  };

  useEffect(() => {
    if (currentPage) {
      setcurrentPage(currentPage);
      //fetch api for monitoring listing
      getMethodWithParams("viewMonitoring", params)
        .then((response) => {
          if (response && response.data?.status) {
            let dataResp = response.data.data;
            let total_count = 0;

            for (var i = 0; i < dataResp.length; i++) {
              if (dataResp[i].is_viewed == false) {
                total_count = total_count + 1;
              }
            }
            setLoading(false);
            setTotalPage(response.data.pagesTotal);
            setTotalList(response.data.recordsTotal);
            setTotalCountUnread(total_count);
            setMonitoringData(dataResp);
          } else {
            setLoading(false);
            setMonitoringData(mockdata);
            showToastMessage();
          }
        })
        .catch((err) => {
          console.log(err);
        });

      //fetch api for summary count
      getMethodWithParams("summaryCount", statistic_params)
        .then((response) => {
          if (response && response.data?.status) {
            let monitoringCountResp = response.data.monitoring_count;
            let etrCountResp = response.data.etr_count;

            setStatusCount(
              statusCount.map((item, i) => {
                if (item.stats_id == "monitoring_count") {
                  return { ...item, ["figure"]: monitoringCountResp };
                }
                if (item.stats_id == "etr_count") {
                  return { ...item, ["figure"]: etrCountResp };
                }
              })
            );
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, startdate, enddate, searchParam]);

  const infoIcon = (
    <MaterialCommunityIcons
      name="information-outline"
      size={18}
      color="black"
    />
  );

  // will simplify later because have some issue for view modal
  const viewMonitoringReport = function (input) {
      let view_report_params = {
        username: userInfo[0].name,
        api_token: userInfo[0].apiToken,
        report_uid: input.report_uid,
      };

      getMethodWithParams("viewLegalMonitoringReport", view_report_params)
        .then((response) => {
          if (response && response.data?.status) {
            console.log("here response woi view", response.data)
            var tnc = response.data.data.is_tnc            
            if(!tnc){
              var html = response.data.data.report;
              var uri = "data:text/html," + encodeURIComponent(html);
              var newWindow = window.open(uri);
              newWindow.document.write(html);
            }else{
              setTncData(response.data.data)
              setIndividualData(input);
              setModalVisible(!modalVisible);
              setModalId("view_monitoring");
              setModalTitle("eTR Monitoring Report");
            }            
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const monitorListColumn = [
    {
      dataField: "subject_name",
      text: "Subject Info",
      sort: true,
      headerStyle: () => {
        return { width: "35%" };
      },
      formatter: (cell, row, rowIndex) => (
        <>
          {cell ? (
            <>
              <HStack alignItems={"center"}>
                <Pressable onPress={() => viewMonitoringReport(row)}>
                  <Text
                    fontWeight={"600"}
                    textDecorationLine={"underline"}
                    color={"primary.500"}
                  >
                    {cell}
                  </Text>
                </Pressable>
                {row.is_viewed == false ? (
                  <Icon
                    as={<FontAwesome name="circle" />}
                    color={"red.50"}
                    ml={3}
                    size="xs"
                  />
                ) : (
                  ""
                )}
              </HStack>
              {row.ds ? (
                <View mt={"5px"}>
                  <Text>{relationshipObj[row.ds]}</Text>
                </View>
              ) : (
                ""
              )}
            </>
          ) : (
            <VStack>
              <Skeleton h="3" rounded="sm" mb={2} />
              <Skeleton h="3" rounded="sm" w={"1/2"} />
            </VStack>
          )}
        </>
      ),
    },
    {
      dataField: "customer_name",
      text: "Customer Name",
      sort: true,
      formatter: (cell) => (
        <>
          {cell ? (
            <Text fontWeight={400}>{cell}</Text>
          ) : (
            <Skeleton h="3" rounded="sm" />
          )}
        </>
      ),
    },
    {
      dataField: "report_type",
      text: "Alert Type",
      sort: true,
      formatter: (cell) => (
        <>
          {cell ? (
            <View>
              <HStack>
                <Badge
                  variant="solid"
                  borderRadius="md"
                  bg={
                    cell === "eTR"
                      ? "yellow.50"
                      : cell === "Mon"
                      ? "red.50"
                      : ""
                  }
                >
                  {cell === "eTR" ? cell : cell === "Mon" ? "CTOS" : ""}
                </Badge>
              </HStack>
            </View>
          ) : (
            <Skeleton h="3" rounded="sm" w="1/2" />
          )}
        </>
      ),
    },
    {
      dataField: "report_date",
      text: "Alert Date",
      sort: true,
      formatter: (cell) => (
        <>
          {cell ? <Text>{cell}</Text> : <Skeleton h="3" rounded="sm" w="1/2" />}
        </>
      ),
    },
  ];
  // end

  let columns = monitorListColumn;
  let data = infoData; //sample data
  let hitsTotal = 11;
  return (
    <>
      <ScrollView>
        <View>
          <StatusCard
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            modalId={"view_monitoring"}
            setModalId={setModalId}
            setModalTitle={setModalTitle}
            enableButton={false}
            buttonName={"Add Monitoring"}
            status={statusCount}
            statusTypeWeb="Monitoring"
            statusTypeMobile="Monitoring Hits"
            total={"Total Hits: " + totalList}
            unreadAlert={totalCountUnread}
          />

          {/* Listing */}
          {isDesktop ? (
            <View>
              <Alert
                unreadAlert={totalCountUnread}
                alertType={"Monitoring Hits"}
                infoIcon={infoIcon}
                tooltipText={"test"}
                badgeText={totalCountUnread + " unread Alerts"}
              />
              <Listing
                handleTableChange={handleTableChange}
                totalPage={totalPage}
                totalList={totalList}
                screen_id={"monitoring"}
                currentPage={currentPage}
                setcurrentPage={setcurrentPage}
                columns={columns}
                data={loading ? mockdata : monitoringData}
                startdate={startdate}
                setStartDate={setStartDate}
                enddate={enddate}
                setEndDate={setEndDate}
                searchParam={searchParam}
                setSearchParam={setSearchParam}
              />
            </View>
          ) : (
            <ListingFLatList
              loading={loading}
              data={loading ? mockdata : monitoringData}
              currentPage={currentPage}
              setcurrentPage={setcurrentPage}
            />
          )}
        </View>
        <CustomModal
          modalId={modalId}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          name={modalTitle}
          contentData={individualData}
          tncData={tncData}
        />

        <PoliciesLink />
      </ScrollView>
    </>
  );
}
