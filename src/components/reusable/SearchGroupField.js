import {
  Input,
  Icon,
  Button,
  InputGroup,
  InputLeftAddon,
  Flex,
  Modal,
  Pressable,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { dateFormatter } from "../../util/UtilityFunction";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import React, { useState, useEffect } from "react";

export default function SearchGroupField(props) {
  const screen_id = props.screen_id;
  const startdate = props.startdate;
  const setStartDate = props.setStartDate;
  const enddate = props.enddate;
  const setEndDate = props.setEndDate;
  const searchInput = props.searchInput;
  const setsearchInput = props.setsearchInput;
  const setcurrentPage = props.setcurrentPage;
  const setSearchParam = props.setSearchParam;
  const [modalVisible, setModalVisible] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });

  const searchListing = (text) => {
    if (text.length >= 4) {
      setSearchParam(text);
      setcurrentPage(1);
    } else if (text.length == 0) {
      setSearchParam("");
      setcurrentPage(1);
    }
  };

  const showModal = function () {
    setModalVisible(!modalVisible);
  };

  const openDateModal = () => {
    setShowDateModal(true);
  };

  const handleSelection = (range) => {
    setDateRange(range.selection);
  };

  const applyDate = () => {
    const { startDate, endDate } = dateRange;
    setStartDate(dateFormatter(startDate));
    setEndDate(dateFormatter(endDate));
    setShowDateModal(false);
  };

  const resetDate = () => {
    setStartDate("");
    setEndDate("");
    setDateRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
    setShowDateModal(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      callMethod(searchTerm);
      // Send Axios request here
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  function callMethod(searchTerm) {
    setsearchInput(searchTerm);
  }
  return (
    <>
      <Flex direction="row" mb={"20px"}>
        <Input
          borderRadius={"md"}
          mr={"30px"}
          w={"20%"}
          borderColor={"gray.200"}
          type="text"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          InputRightElement={
            <Button
              ml={1}
              bgColor={"#EBEBEB"}
              roundedLeft={0}
              roundedRight="md"
            >
              <Icon
                as={<Feather name="search" color={"#797979"} />}
                size="lg"
              />
            </Button>
          }
          placeholder="Search"
        />

        <Pressable onPress={() => openDateModal()}>
          <InputGroup w={"20%"} fontSize="16px">
            {/* <Input type="text" borderColor={"gray.200"} borderRadius={"md"} textAlign={'center'} placeholder="Start Date" /> */}
            <Input
              type="text"
              borderColor={"gray.200"}
              borderRadius={"md"}
              textAlign={"center"}
              placeholder={startdate}
              value={startdate}
              disabled
            />
            <InputLeftAddon
              border={"none"}
              bg={"#EBEBEB"}
              borderColor={"gray.200"}
              borderRadius="unset"
              children={"To"}
              color={"#797979"}
              cursor={"default"}
              py={"10px"}
              px={"16px"}
            />
            <Input
              type="text"
              borderRadius={"md"}
              borderColor={"gray.200"}
              textAlign={"center"}
              placeholder={enddate}
              value={enddate}
              disabled
            />
          </InputGroup>
        </Pressable>
      </Flex>

      {/* Modal for display select date range */}
      <Modal
        isOpen={showDateModal}
        onClose={() => setShowDateModal(false)}
        safeAreaTop={true}
      >
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Select Date</Modal.Header>
          <Modal.Body>
            <DateRange
              editableDateInputs={true}
              onChange={handleSelection}
              moveRangeOnFirstSelection={false}
              // minDate={new Date()}
              ranges={[dateRange]}
              rangeColors={["#007b85"]}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  resetDate();
                }}
              >
                Reset
              </Button>
              <Button
                onPress={() => {
                  applyDate();
                }}
              >
                Apply
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
