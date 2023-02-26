import { View, VStack, Image, Text, Heading } from "native-base";

function InternetFail() {
  return (
    <View py={10}>
      <VStack alignItems="center" marginTop={5}>
        <Image
          source={require("../../../assets/image/no-internet.png")}
          alt="cm-logo"
          size={"xl"}
          mb={5}
        />
        <Heading>Unable to Connect</Heading>
        <Text paddingTop={15}>
          Please check your internet connection and try again.
        </Text>
      </VStack>
    </View>
  );
}

export default InternetFail;
