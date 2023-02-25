import { View, VStack, Image, Text, Heading } from "native-base";

function Error() {
  return (
    <View py={10}>
      <VStack alignItems="center" marginTop={5}>
        <Image
          source={require("../../../assets/image/warning.png")}
          alt="cm-logo"
          size={"xl"}
          mb={5}
        />
        <Heading>Error</Heading>
        <Text paddingTop={15}>
          Oops, something went wrong. Please try again later.
        </Text>
      </VStack>
    </View>
  );
}

export default Error;
