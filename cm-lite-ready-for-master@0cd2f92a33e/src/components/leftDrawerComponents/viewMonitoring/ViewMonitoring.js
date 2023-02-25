import { View, Text, Box, HStack, Center, Divider, Heading, Badge, Flex, InputGroup, Input, InputLeftAddon, FlatList, Icon, Link } from "native-base";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { isMobile } from "react-device-detect";
import { FontAwesome } from "@expo/vector-icons";

export default function ViewMonitoring(props) {
  const [index, setIndex] = useState(0); 
  const contentData = props.contentData

  const sample_data= [
    {
      id: 1,
      subject: "New Legal Case",
      type: "CTOS",
      req_date: "09/01/2022",
    },
    {
      id: 2,
      subject: "Updated Legal Case",
      type: "CTOS",
      req_date: "09/01/2022",
    },
    {
      id: 3,
      subject: "eTR Charges",
      type: "eTR",
      req_date: "09/01/2022",
    },
    {
      id: 4,
      subject: "eTR Charges",
      type: "eTR",
      req_date: "09/01/2022",
    }
  ];

  return (

    <>
      <View p={4}>
        <Heading mb={1} size="md">
          {contentData.subject_name}

          {contentData.is_viewed == false ? (
            <Badge _text={{fontSize: 10}} variant="solid" borderRadius="md" colorScheme="error" ml={4}>
              1 {/*  will simplify for each count */}
            </Badge>) : ("")
          }          
        </Heading>
        <Text mb={"30px"}>(1998283773273/ 0322983292)</Text>

        {/* <Text color={"#797979"} fontSize={"16px"}>Relationship</Text>
        <View>
          <Flex direction={"row"} justifyContent={"space-between"} >
            <Text fontWeight={"600"}>Director:</Text>
            <Text color={"primary.500"} fontWeight={"600"} textDecorationLine={"underline"}>Alex Lee Beng Huat</Text>
          </Flex>
          <Flex direction={"row"} justifyContent={"space-between"} >
            <Text fontWeight={"600"}>Shareholder:</Text>
            <Text color={"primary.500"} fontWeight={"600"} textDecorationLine={"underline"}>Sarawak Energy Sdn Bhd</Text>
          </Flex>
          <Flex direction={"row"} justifyContent={"space-between"} >
            <Text fontWeight={"600"} textDecorationLine={"underline"}>Partner:</Text>
            <Text color={"primary.500"} fontWeight={"600"} textDecorationLine={"underline"}>Yap Hui Hui</Text>
          </Flex>
        </View>

        <InputGroup fontSize="16px" my={"30px"}>
            <Input type="text" borderRadius={"md"} textAlign={'center'} placeholder="Start Date" />
            <InputLeftAddon border={'none'} bg={'#EBEBEB'} borderRadius="unset" children={'To'} color={"#797979"} cursor={'default'}/>
            <Input type="text" borderRadius={"md"} textAlign={'center'} placeholder="End Date" />                            
        </InputGroup> */}
      </View>

      <Box px={4} bg={"gray.50"}>

        <FlatList
          data={[contentData]}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => (
            <HStack p={2} space={2}>
              <View w={"75%"}>
                <HStack space={2}>
                  {/* subject name [report & monitoring]*/}
                  {item.report_type === "CTOS" ? (
                    <Link href={'http://175.144.214.90:8080/creditfile/api/download/etr_monitoring_step1?username=CBSASY&api_token=2f5a2906c42a4cb079c7c00eb3a6893c&report_uid=' + item.report_uid}>
                      <Heading fontWeight={"600"} fontSize="sm" color={"primary.500"} mb={2}>
                        <Text textDecorationLine={"underline"}>New Legal Case</Text>
                        {item.is_viewed == false ? (<Icon as={<FontAwesome name="circle" />} color={"red.50"} ml={1} size="xs"/>) : ("")}
                      </Heading>
                    </Link>                    
                  ) : null}
                  {item.report_type === "eTR" ? (
                    <Link href={"http://175.144.214.90:8080/creditfile/api/download/etr_monitoring_step1?username=CBSASY&api_token=2f5a2906c42a4cb079c7c00eb3a6893c&report_uid=" + item.report_uid}>
                      <Heading fontWeight={"600"} fontSize="sm" color={"primary.500"} mb={2}>
                        <Text textDecorationLine={"underline"}>eTR Charges</Text>
                        {item.is_viewed == false ? (<Icon as={<FontAwesome name="circle"  />} color={"red.50"} ml={1} size="xs"/>) : ("")}
                      </Heading>
                    </Link>                    
                  ) : null}
                </HStack>

                <HStack space={2}>
                  {/* subject type [report , monitor and etr]*/}
                  {item.report_type === "CTOS" ? (
                    <Badge variant="solid" borderRadius="md" colorScheme="red">
                      {item.report_type}
                    </Badge>
                  ) : null}
                  {item.report_type === "eTR" ? (
                    <Badge variant="solid" borderRadius="md" colorScheme="yellow">
                      {item.report_type}
                    </Badge>
                  ) : null}

                </HStack>
              </View>
              <View w={"25%"}>
                {/* date for report */}
                {item.report_date ? (
                  <Heading fontSize="sm">{item.report_date}</Heading>
                ) : null}
              </View>
            </HStack>
          )}
        />

      </Box>
    </>
    
  );
}
