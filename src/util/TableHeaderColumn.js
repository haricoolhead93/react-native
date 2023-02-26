import {
  HStack,
  Badge,
  Text,
  Button,
  Pressable,
  View,
  VStack,
  Skeleton,
} from "native-base";

import { Linking } from "react-native";
import { REACT_NATIVE_APP_BASE_URL } from "@env";
import React from "react";

const clickItemModal = function (input) {
  // console.log("here click row button", input);
};

let toPasstype = {
  subjectType: "",
  orderby: "",
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
                  cell === "eTR" ? "yellow.50" : cell === "Mon" ? "red.50" : ""
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

const reportListColumn = [
  {
    dataField: "id",
    text: "No",
    headerStyle: () => {
      return { width: "5%" };
    },
    sort: false,
    formatter: (cell) => (
      <>
        {cell ? (
          <View>
            <span>{cell}</span>
          </View>
        ) : (
          <Skeleton h="3" rounded="sm" w="1/2" />
        )}
      </>
    ),
  },
  {
    dataField: "Subject",
    text: "Subject Info",
    sort: true,
    headerStyle: () => {
      return { width: "30%" };
    },
    onSort: (field, order) => {
      callPassParams(field, order);
    },
    formatter: (cell) => (
      <>
        {cell ? (
          <View>
            <Text
              color={"#007B85"}
              onPress={() => {
                callURL(cell);
              }}
            >
              {format(cell)}
            </Text>
            <span>company no: {renderRegn(cell)}</span>
          </View>
        ) : (
          <VStack flex="2" space="2">
            <Skeleton h="3" rounded="sm" />
            <Skeleton h="3" rounded="sm" w="1/2" />
          </VStack>
        )}
      </>
    ),
  },
  {
    dataField: "type",
    text: "Subject Type",
    sort: true,
    onSort: (field, order) => {
      callPassParams(field, order);
    },
    formatter: (cell) => (
      <>
        {cell ? (
          <View>
            <HStack>
              <Badge variant="solid" borderRadius="md" colorScheme="primary">
                {cell}
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
    dataField: "report",
    text: "Report Type",
    sort: true,
    onSort: (field, order) => {
      callPassParams(field, order);
    },
    formatter: (cell) => (
      <>
        {cell ? (
          <View>
            <span>{cell}</span>
          </View>
        ) : (
          <Skeleton h="3" rounded="sm" w="1/2" />
        )}
      </>
    ),
  },
  {
    dataField: "status",
    text: "Status",
    sort: true,
    onSort: (field, order) => {
      callPassParams(field, order);
    },
    formatter: (cell) => {
      if (cell === "ready" || cell === "complete") {
        return cell ? (
          <View>
            <HStack>
              <Badge variant="solid" borderRadius="md" colorScheme="success">
                {cell}
              </Badge>
            </HStack>
          </View>
        ) : (
          <Skeleton h="3" rounded="sm" w="1/2" />
        );
      }
      if (cell === "in progress") {
        return cell ? (
          <View>
            <HStack>
              <Badge variant="solid" borderRadius="md" bg={"#FFC241"}>
                {cell}
              </Badge>
            </HStack>
          </View>
        ) : (
          <Skeleton h="3" rounded="sm" w="1/2" />
        );
      }
      if (cell === "failed") {
        return cell ? (
          <View>
            <HStack>
              <Badge variant="solid" borderRadius="md" colorScheme="error">
                {cell}
              </Badge>
            </HStack>
          </View>
        ) : (
          <Skeleton h="3" rounded="sm" w="1/2" />
        );
      }
    },
  },
  {
    dataField: "Requested_Date",
    text: "Requested Date",
    sort: true,
    onSort: (field, order) => {
      callPassParams(field, order);
    },
    formatter: (cell) => (
      <>
        {cell ? (
          <View>
            <span> {formatDate(cell)}</span>
          </View>
        ) : (
          <Skeleton h="3" rounded="sm" w="1/2" />
        )}
      </>
    ),
  },
];

const etrSubmittedListColumn = [
  {
    dataField: "etr_subject",
    text: "eTR Submitted Subject",
    sort: true,
    headerStyle: () => {
      return { width: "35%" };
    },
    formatter: (cell) => (
      <>
        {cell ? (
          <View>
            <span>{cell}</span>
            <br />
            <span>{"(1210127X / - )"}</span>
          </View>
        ) : (
          <VStack flex="2" space="2">
            <Skeleton h="3" rounded="sm" />
            <Skeleton h="3" rounded="sm" w="1/2" />
          </VStack>
        )}
      </>
    ),
  },
  {
    dataField: "type",
    text: "Subject Type",
    sort: true,
    formatter: (cell) => (
      <>
        {cell ? (
          <HStack>
            <Badge variant="solid" borderRadius="md" colorScheme="primary">
              {cell}
            </Badge>
          </HStack>
        ) : (
          <Skeleton h="3" rounded="sm" w="1/2" />
        )}
      </>
    ),
  },
  {
    dataField: "account_no",
    text: "Account No.",
    sort: true,
    formatter: (cell) => (
      <>
        {cell ? (
          <View>
            <span>{cell}</span>
          </View>
        ) : (
          <Skeleton h="3" rounded="sm" w="1/2" />
        )}
      </>
    ),
  },
  {
    dataField: "listed_date",
    text: "Listed Date",
    sort: true,
    formatter: (cell) => (
      <>
        {cell ? (
          <View>
            <span>{cell}</span>
          </View>
        ) : (
          <Skeleton h="3" rounded="sm" w="1/2" />
        )}
      </>
    ),
  },
  {
    dataField: "amount",
    text: "Amount (RM)",
    sort: true,
    formatter: (cell) => (
      <>
        {cell ? (
          <View>
            <span>{cell}</span>
          </View>
        ) : (
          <Skeleton h="3" rounded="sm" w="1/2" />
        )}
      </>
    ),
  },
];

function renderRegn(cell) {
  // console.log("i m getting called", cell);
  let substrings = cell.split("&");
  if (substrings.length > 0) {
    return substrings[4];
  }
}
function callURL(cell) {
  let substrings = cell.split("&");
  let URL =
    REACT_NATIVE_APP_BASE_URL +
    "creditfile/api/download/ctos?username=" +
    substrings[2] +
    "&api_token=" +
    substrings[3] +
    "&report_uid=" +
    substrings[1];
  Linking.openURL(URL);
}
function format(cell) {
  let substrings = cell.split("&");
  return substrings[0];
}

function formatDate(cell) {
  let substrings = cell.split(" ");
  return substrings[0];
}
function callPassParams(field, order) {
  toPasstype.subjectType = field;
  toPasstype.orderby = order;
}
export {
  monitorListColumn,
  reportListColumn,
  etrSubmittedListColumn,
  toPasstype,
};
