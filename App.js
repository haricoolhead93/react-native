import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
// reducer
import { store } from "./store";
// style
import theme from "./style/theme";
import { isDesktop, isMobile } from "react-device-detect";
import MyDrawer from "./src/components/template/drawerOptions";
import "./language/i18n"; // import as a global doesnt need to be used
import { useDispatch, useSelector } from "react-redux";

import {
  HeaderLeftOptions,
  HeaderRightOptions,
  ImageHeader,
} from "./src/components/template/header";
import { setDimensionChange, setResize } from "./slices/userSlice";

const Stack = createNativeStackNavigator();
let backgroundHeaderColor = "#007B85";

function Main() {
  const [shouldShow, setShouldShow] = useState(true);
  const [shouldToggle, setShouldToggle] = useState(false);
  const dispatch = useDispatch();
  const { headerDash } = useSelector((state) => state.drawer);
  let toPassheight = 72;
  if (isMobile && headerDash) {
    toPassheight = 228;
    dispatch(setDimensionChange(true));
  } else if (isDesktop) {
    toPassheight = 72;
    dispatch(setDimensionChange(false));
  }
  if (window.innerWidth <= 796) {
    dispatch(setResize(true));
  }
  const handleResize = () => {
    if (window.innerWidth > 1000 || window.innerHeight > 500) {
      dispatch(setResize(false));
    }
    if (window.innerWidth < 1000 || window.innerHeight < 500) {
      dispatch(setResize(true));
    }
  };
  React.useEffect(() => {
    if (isDesktop) {
      window.addEventListener("resize", handleResize, false);
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: !shouldToggle,
          headerBackground: (props) => <ImageHeader />,
          headerStyle: {
            backgroundColor: backgroundHeaderColor,
            height: toPassheight,
          },
          headerTitle: "",
          headerTintColor: "#fff",
          headerRight: () => <HeaderRightOptions {...navigation} />,
          headerLeft: (navigation) => (
            <HeaderLeftOptions
              navigationProps={navigation}
              shouldShow={shouldShow}
              setShouldShow={setShouldShow}
              shouldToggle={shouldToggle}
              setShouldToggle={setShouldToggle}
            />
          ),
        })}
      >
        <Stack.Screen
          name="Dashboard"
          component={() => (
            <MyDrawer
              shouldToggle={shouldToggle}
              setShouldToggle={setShouldToggle}
            />
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default function App() {
  let originaldimension = {
    height: window.innerHeight,
    width: window.innerWidth,
  };
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <Main />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </Provider>
  );
}
