import { HStack, Text, Link, View, ScrollView, Center } from "native-base";
import { isDesktop } from "react-device-detect";
import { useSelector } from "react-redux";

export default function PoliciesLink() {
  const { isMobileDimension } = useSelector((state) => state.user);
  const { isResize } = useSelector((state) => state.user);

  if (!isMobileDimension && !isResize) {
    return (
      <View my={30} ml={6} style={{ flex: 1, bottom: 0 }}>
        <HStack space={4} style={{ justifyContent: "left" }}>
          <Link
            href="https://cm4.cmctos.com.my/creditfile_new/disclaimer.html"
            isExternal
            _text={{
              color: "#007B85",
            }}
          >
            Disclaimer Clause
          </Link>
          <Link
            href="https://cm4.cmctos.com.my/creditfile_new/security.html"
            isExternal
            _text={{
              color: "#007B85",
            }}
          >
            Security Disclaimer
          </Link>
          <Link
            href="https://cm4.cmctos.com.my/creditfile_new/privacy.html "
            isExternal
            _text={{
              color: "#007B85",
            }}
          >
            Privacy Statement
          </Link>
          <Link
            href="https://cm4.cmctos.com.my/creditfile_new/terms.html"
            isExternal
            _text={{
              color: "#007B85",
            }}
          >
            Terms of Use
          </Link>
          <Text style={{ position: "absolute", right: 30 }}>
            (C) Copyright of CTOS Business System Sdn Bhd (2022)
          </Text>
        </HStack>
      </View>
    );
  }
}
