import {
  View,
  Text,
  Heading,
  Box,
  Badge,
  HStack,
  Radio,
  Checkbox,
  ScrollView,
  Button,
} from "native-base";
import React from "react";
import AddOn from "./AddOn";
import { useSelector } from "react-redux";

export default function Step2({ height,setIndex }) {
  const { selectCustomer } = useSelector((state) => state.buyReport);
  return (
    <View px={4}>
      <Heading size="md" mb={2}>
        Step2
      </Heading>
      <Text fontSize="sm" mb={4}>
        Select Report Details
      </Text>

      <Box py={2} px={4} bg={"#E1E1E1"}>
        <Heading size="sm" mb={1}>
          {selectCustomer.name}
        </Heading>
        <Text fontSize="sm" mb={1}>
          {selectCustomer.id}
        </Text>
        <HStack>
          <Badge variant="solid" borderRadius="md" colorScheme="primary">
            {selectCustomer.party_type}
          </Badge>
        </HStack>
      </Box>

      <ScrollView h={height}>
        <View py={1}>
          <Radio.Group
            name="myRadioGroup"
            defaultValue="two"
            // value={value}
            // onChange={(nextValue) => {
            //   setValue(nextValue);
            // }}
          >
            <Radio size="sm" value="one" my={2}>
              <Text fontSize="sm">Archive Data (31/06/2022)</Text>
            </Radio>
            <Radio size="sm" value="two">
              <Text fontSize="sm">Live Data</Text>
            </Radio>
          </Radio.Group>
        </View>
        <View py={2}>
          <Heading size="sm" mb={2}>
            Optional add-on:
          </Heading>
          <AddOn />
        </View>
        <View>
          <Checkbox isChecked colorScheme="primary" mb={1}>
            <Text fontSize="sm">
              We hereby undertake that consent for CTOS to release personal /
              credit information from selected subject. Learn More
            </Text>
          </Checkbox>
          <Button variant="primary" onPress={()=>setIndex(2)}>Next</Button>
        </View>
      </ScrollView>
    </View>
  );
}
