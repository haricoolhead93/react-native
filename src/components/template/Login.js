import {
  HStack,
  Box,
  Center,
  Hidden,
  Text,
  Heading,
  Image,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
} from "native-base";
import React from "react";
import { Dimensions, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { login } from "../../../slices/userSlice";
import { useTranslation } from "react-i18next";


export default function Login() {
  let ScreenHeight = Dimensions.get("window").height;
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../../assets/image/login-background.png")}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <HStack justifyContent="center" h={ScreenHeight - 1}>
          <Box w={["100%", "sm"]} bg="rgba(247, 247, 247, 0.95)" p={5}>
            <Image
              source={require("../../../assets/image/CTOS_CM_logo.png")}
              alt="cm-logo"
              width={"100%"}
              height={"41px"}
              mb={16}
            />
            <Heading size="xl" fontWeight="600" mb={5}>
               Sign In
            </Heading>
            <VStack space={3} mt="5">
              <FormControl mb={2}>
                <Input variant="unstyled" placeholder="Email ID" />
              </FormControl>
              <FormControl mb={2}>
                <Input
                  variant="unstyled"
                  type="password"
                  placeholder="Password"
                />
              </FormControl>
              {/* <FormControl mb={2}>
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "primary.500",
                  }}
                  alignSelf="flex-start"
                  mt="1"
                >
                  Forget Password?
                </Link>
              </FormControl> */}

              <Button mt="2" variant="primary" onPress={() => dispatch(login())}>
                Sign in
              </Button>
              {/* <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="primary.500">
                  Create new account
                </Text>
              </HStack> */}
            </VStack>
          </Box>
          <Hidden from="base" till="md">
            <Box flex={1} justifyContent={"flex-end"} mb={10}>
              <Center w="100%">
                <Heading size="lg" fontWeight="600">
                  Malaysia’s No.1 Credit Management Solution
                </Heading>
                <Text fontWeight="600">
                  Trusted by leading banks and businesses in Malaysia
                </Text>
              </Center>
            </Box>
          </Hidden>
        </HStack>
      </ImageBackground>
    </SafeAreaView>
  );
}
