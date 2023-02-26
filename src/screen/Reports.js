import {
  View,
  Heading,
  Box,
  Text,
  VStack,
  Image,
  Button,
  ScrollView,
  Center,
  useToast,
  Toast,
  HStack,
  Spacer,
} from "native-base";
import React from "react";
import { CustomModal } from "../components/template/customModal";
import StatusCard from "../components/reusable/StatusCard";
import Listing from "../components/reusable/Listing";
import { reportListColumn, toPasstype } from "../util/TableHeaderColumn";
import { useSelector } from "react-redux";
import { isDesktop } from "react-device-detect";
import ListingFLatList from "../components/reusable/ListingFLatList";
import { getMethodWithParams } from "../services/apiCalls";
import BuyReport from "../components/leftDrawerComponents/buyReport/BuyReport";
import PoliciesLink from "../components/template/PoliciesLink";
import InternetFail from "../components/template/InternetFail";
import { mockData } from "../components/reusable/MockDataTemplate";
import Error from "../components/template/Error";
import { TouchableOpacity } from "react-native";
import { showToastMessage } from "../util/UtilityFunction";
import { dateFormatter } from "../util/UtilityFunction";

export default function Reports() {
  let today = new Date();
  let priorDate = new Date(new Date().setDate(today.getDate() - 30));
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [errorInternet, seterrorInternet] = React.useState(false);
  const { infoStatus, infoData } = useSelector((state) => state.info);
  const { userInfo, userStatus } = useSelector((state) => state.user);

  const [currentPage, setcurrentPage] = React.useState(1);
  const [isError, setisError] = React.useState(false);
  const [totalList, setTotalList] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState(1);
  const [statusCount, setStatusCount] = React.useState(infoStatus);
  const [searchInput, setsearchInput] = React.useState("");

  const [startdate, setStartDate] = React.useState(dateFormatter(priorDate));
  const [enddate, setEndDate] = React.useState(dateFormatter(today));
  const [index, setIndex] = React.useState(0);

  const { isMobileDimension } = useSelector((state) => state.user);

  //change to mackdata have to handle that changes
  React.useEffect(() => {
    if (currentPage) {
      setcurrentPage(currentPage);
      fetchReports();
    }
  }, [currentPage, startdate, enddate, searchInput]);

  fetchReportSummary();
  const [reportData, setreportData] = React.useState([]);
  let status = infoStatus;
  let columns = reportListColumn;
  let data = [];
  let toPassdata = reportData;
  if (toPassdata) {
    const newArrayOfObj = toPassdata.map(
      ({
        subject_name: Subject,
        report_type: report,
        report_date: Requested_Date,
        status: status,
        subject_type: type,
        ...rest
      }) => ({
        Subject,
        report,
        Requested_Date,
        type,
        status,
        ...rest,
      })
    );

    newArrayOfObj.map((item, i) => {
      item.id = i + 1;
      item.isReports = true;
      if (item?.Subject) {
        item.Subject =
          item?.Subject +
          "&" +
          item?.report_uid +
          "&" +
          userInfo[0].name +
          "&" +
          userInfo[0].apiToken +
          "&" +
          item?.reg_no;
      }
    });

    data = newArrayOfObj;
  }

  // to mimic Skeleton
  data = loading ? mockData : data;

  // console.log(data);
  let reportTotal = 11;

  const handleTableChange = (type, { page, sizePerPage }) => {
    fetchReports();
    fetchReportSummary();
  };
  return (
    <ScrollView>
      <View>
        {!errorInternet ? (
          <View>
            <View>
              <StatusCard
                status={statusCount}
                statusTypeWeb="Purchased Report"
                statusTypeMobile="Report Purchased History"
                total={"Total Reports: " + totalList}
                buttonName={"Buy Report"}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                searchInput={searchInput}
                setsearchInput={setsearchInput}
              />

              {data && data?.length > 0 ? (
                <View>
                  {!isMobileDimension ? (
                    <Listing
                      listingType="Report Listing"
                      handleTableChange={handleTableChange}
                      totalPage={totalPage}
                      totalList={totalList}
                      columns={columns}
                      data={data}
                      currentPage={currentPage}
                      loading={loading}
                      setcurrentPage={setcurrentPage}
                      startdate={startdate}
                      setStartDate={setStartDate}
                      enddate={enddate}
                      setEndDate={setEndDate}
                      searchInput={searchInput}
                      setsearchInput={setsearchInput}
                    />
                  ) : (
                    <ListingFLatList
                      data={data}
                      currentPage={currentPage}
                      setcurrentPage={setcurrentPage}
                      loading={isError ? true : loading}
                    />
                  )}
                </View>
              ) : (
                <View p={4}>
                  <Heading size="md" mb={2}>
                    Report Listing
                  </Heading>
                  <Box borderRadius="md" bg={"white"} p={4}>
                    <VStack alignItems="center" marginTop={5}>
                      <Image
                        source={require("../../assets/image/no-report.png")}
                        alt="cm-logo"
                        size={"lg"}
                        mb={5}
                      />
                      <Text>You are not purchased any report yet.</Text>
                      <CustomModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        name={"Buy Report"}
                        modalId={"buy_report"}
                        showButton={true}
                        index={index}
                        setIndex={setIndex}
                      />
                    </VStack>
                  </Box>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View>
            <View>
              <InternetFail />
              <VStack alignItems="center">
                <Button variant="primary" onPress={() => fetchReports()}>
                  Try Again
                </Button>
              </VStack>
            </View>
          </View>
        )}
      </View>
      <PoliciesLink />
    </ScrollView>
  );

  function fetchReports() {
    // userslice username and apitoken
    // fetch pagenumber dynamically from list and flat list
    let params = {
      username: userInfo[0].name,
      api_token: userInfo[0].apiToken,
      page_number: currentPage,
      records_per_page: 10,
      report_type: "fico",
      req_status: 0,
      name: searchInput,
      start_date: startdate,
      end_date: enddate,
      order_column: toPasstype.subjectType,
      order_by: toPasstype.orderby,
    };

    getMethodWithParams("viewReport", params)
      .then((response) => {
        if (response && response.data?.status) {
          let dataResp = response.data.data;
          setLoading(false);
          setTotalPage(response.data.pagesTotal);
          setTotalList(response.data.recordsTotal);
          setreportData(dataResp);
        } else {
          setLoading(false);
          showToastMessage();
          setreportData(mockData);
          setisError(true);
        }
      })
      .catch((err) => {
        seterrorInternet(true);
      });
  }

  function fetchReportSummary() {
    // userslice username and apitoken
    // fetch pagenumber dynamically from list and flat list
    let statistic_params = {
      username: userInfo[0].name,
      api_token: userInfo[0].apiToken,
      summary_type: "report_sum",
    };

    //fetch api for summary count
    getMethodWithParams("summaryCount", statistic_params)
      .then((response) => {
        if (response && response.data?.status) {
          let ReadyCountResp = response.data.ready_count;
          let InProgressCountResp = response.data.in_progress_count;
          let FailedCountResp = response.data.failed_count;

          setStatusCount(
            statusCount.map((item, i) => {
              if (item.stats_id == "ready_count") {
                return { ...item, ["figure"]: ReadyCountResp };
              }
              if (item.stats_id == "in_progress_count") {
                return { ...item, ["figure"]: InProgressCountResp };
              }
              if (item.stats_id == "failed_count") {
                return { ...item, ["figure"]: FailedCountResp };
              }
            })
          );
        } else {
          // console.log("error");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }
}
