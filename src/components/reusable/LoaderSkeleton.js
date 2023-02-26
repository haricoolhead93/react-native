import React from "react";
import { Center, VStack, Skeleton, View, HStack } from "native-base";

export default function LoaderSkeleton(props) {
  const typeVal = props.typeVal;

  return (
    <>
      {typeVal == "progress" ? (
        <HStack
          borderWidth="1"
          flex={2}
          space={8}
          rounded="sm"
          _dark={{
            borderColor: "coolGray.500",
          }}
          _light={{
            borderColor: "coolGray.200",
          }}
          p="5"
        >
          <Skeleton w="12" h="12" rounded="full" />
          <VStack flex="3" space="2" h="3">
            <Skeleton h="3" rounded="sm" />
            <Skeleton h="3" rounded="sm" w="1/2" />
          </VStack>
        </HStack>
      ) : null}

      {typeVal == "Quick" ? (
        <Center w="100%">
          <VStack
            borderWidth="1"
            flex={2}
            space={5}
            rounded="sm"
            _dark={{
              borderColor: "coolGray.500",
            }}
            _light={{
              borderColor: "coolGray.200",
            }}
            p="7"
          >
            <Skeleton w="12" h="12" rounded="full" />

            <Skeleton h="3" rounded="sm" />
            <Skeleton h="3" rounded="sm" />
          </VStack>
        </Center>
      ) : null}

      {typeVal == "mobileReport" ? (
        <HStack
          flex={1}
          space={8}
          rounded="sm"
          _dark={{
            borderColor: "coolGray.500",
          }}
          _light={{
            borderColor: "coolGray.200",
          }}
          p="1"
        >
          <VStack flex="2" space="3">
            <Skeleton h="4" rounded="sm" />
            <Skeleton h="4" rounded="sm" w="1/2" />

            <HStack space="3">
              <Skeleton h="4" rounded="sm" w="1/4" />
              <Skeleton h="4" rounded="sm" w="1/4" />
              <Skeleton h="4" rounded="sm" w="1/4" />
            </HStack>
          </VStack>

          <Skeleton h="4" rounded="sm" flex="1" />
        </HStack>
      ) : null}

      {typeVal == "reportSearch" ? (
        <HStack
          flex={1}
          space={8}
          rounded="sm"
          p="1"
          my={2}
          borderColor="coolGray.200"
          borderBottomWidth="1"
        >
          <VStack flex="2" space="3">
            <Skeleton h="4" rounded="sm" />
            <Skeleton h="4" rounded="sm" w="1/2" />

            <HStack space="3">
              <Skeleton h="4" rounded="sm" w="1/4" />
            </HStack>
          </VStack>

          <Skeleton h="4" rounded="sm" w="8" my="8" />
        </HStack>
      ) : null}
      
    </>
  );
}
