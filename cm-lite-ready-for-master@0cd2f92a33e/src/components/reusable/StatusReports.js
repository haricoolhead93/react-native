import {
  View,
  VStack,
  Image,
  Text,
  Heading,
} from "native-base";

function SucessMessage() {
  return (
    <View py={10}>
      <VStack alignItems="center" marginTop={5}>
        <Image
          source={require("../../../assets/image/success.png")}
          alt="cm-logo"
          size={"xl"}
          mb={5}
        />
        <Heading color="#007B85" fontSize="sm">Successful</Heading>
        <Text paddingTop={15}
          fontSize="sm">Your Report is Ready to View</Text>
      </VStack>
    </View>
  );
}

function InProcessMessage() {
  return (
    <View py={10}>
      <VStack alignItems="center" marginTop={5}>
        <Image
          source={require("../../../assets/image/Inprogress.png")}
          alt="cm-logo"
          size={"xl"}
          mb={5}
        />
        <Heading fontSize={"sm"}>In Progress</Heading>
        <Text fontSize="sm" textAlign="center" pl={"20"} pr={"20"} >
          Report purchase request received, report generation in progress.
        </Text>
      </VStack>
    </View>
  );
}
function ErrorMessage() {
  return (
    <View py={10}>
      <VStack alignItems="center" marginTop={5}>
        <Image
          source={require("../../../assets/image/Failed.png")}
          alt="cm-logo"
          size={"xl"}
          mb={5}
        />
        <Heading color={"#E73A3A"} fontSize="sm">Failed</Heading>

        <Text fontSize="13" textAlign="center" pl={"20"} pr={"20"}>
          We are unable to process your report purchase. Kindly try again.
        </Text>

      </VStack>
    </View>
  );
}
export { SucessMessage, ErrorMessage, InProcessMessage };
