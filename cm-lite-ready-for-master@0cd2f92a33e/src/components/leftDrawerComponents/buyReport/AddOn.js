import { View, Text, Checkbox } from "native-base";
import React from "react";

export default function AddOn() {
  return (
    <View>
      <Checkbox colorScheme="primary" mb={1}>
        <Text fontSize="sm">CCM (SSM)</Text>
      </Checkbox>
      <Checkbox colorScheme="primary" mb={1}>
        <Text fontSize="sm">Legal Case + eTR (CTOS Report)</Text>
      </Checkbox>
      <Checkbox colorScheme="primary" mb={1}>
        <Text fontSize="sm">CTOS SME Score Report</Text>
      </Checkbox>
      <Checkbox colorScheme="primary" mb={1}>
        <Text fontSize="sm">CCRIS</Text>
      </Checkbox>
      <Checkbox colorScheme="primary" mb={1}>
        <Text fontSize="sm">Liabilities as Guarantor (LAG)</Text>
      </Checkbox>
      <Checkbox colorScheme="primary" mb={1}>
        <Text fontSize="sm">CCRIS Supplementary</Text>
      </Checkbox>
    </View>
  );
}
