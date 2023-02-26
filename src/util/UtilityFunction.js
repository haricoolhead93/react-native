import {
    Box,
    Text,
    useToast,
    Toast,
    HStack,
    Spacer,
  } from "native-base";
  import { TouchableOpacity } from "react-native";

function dateFormatter(input){
    var date_format = addDateZero(input.getDate()) + "-" + addDateZero(input.getMonth() + 1)  + "-" + input.getFullYear()
    return date_format
}

function addDateZero(date_input){
    if(date_input <= 9){
        date_input = "0" + date_input
    }
    return date_input
}

function showToastMessage() {
    Toast.show({
      duration: 5000,
      render: () => {
        return (
          <Box
            bg="#FFDDD0"
            h="30"
            w="680"
            justifyContent="center"
            marginLeft={20}
          >
            <HStack>
              <Text color={"#F8946D"} px="5">
                Oops Something Went wrong.Please press again to reload data
              </Text>
              <Spacer></Spacer>
              <TouchableOpacity>
                <Text
                  px="5"
                  style={{ color: "#007B85", textDecorationLine: "underline" }}
                >
                  Try Again
                </Text>
              </TouchableOpacity>
            </HStack>
          </Box>
        );
      },
    });
  }

export { dateFormatter, addDateZero, showToastMessage };