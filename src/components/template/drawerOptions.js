import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconFeather from "react-native-vector-icons/Feather";
import Reports from "../../screen/Reports";
import Dashboard from "../../screen/Dashboard";
import Monitor from "../../screen/Monitor";
import Reinforce from "../../screen/Reinforce";
import etrSubmit from "../../screen/etrSubmit";
import etrReach from "../../screen/etrReach";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
import { isDesktop, isMobile } from "react-device-detect";
import SideMenuWeb from "./SideMenu";
import { useSelector } from "react-redux";
let topassDrawer = "";
let toPassWidth = "";

export default function MyDrawer({ shouldToggle, setShouldToggle }) {
  const { drawerStatus } = useSelector((state) => state.drawer);
  const { isResize } = useSelector((state) => state.user);

  if (isDesktop) {
    if (!isResize) {
      topassDrawer = "permanent";
      toPassWidth = 240;
    } else {
      topassDrawer = null;
    }
  } else if (isMobile) {
    toPassWidth = "100%";
    topassDrawer = "";
  }

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => (
        <SideMenuWeb
          {...props}
          toggleText={!drawerStatus}
          shouldToggle={shouldToggle}
          setShouldToggle={setShouldToggle}
        />
      )}
      screenOptions={({ navigation }) => ({
        drawerType: topassDrawer,
        drawerStyle: {
          width: drawerStatus ? 60 : toPassWidth,
        },
        headerShown: false,
        drawerActiveTintColor: "#007B85",
        drawerInactiveTintColor: "#797979",
      })}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Dashboard",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={16}
              color="#007B85"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Reports"
        component={Reports}
        options={{
          title: "Reports",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={16}
              color="#007B85"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Monitor"
        component={Monitor}
        options={{
          title: "Monitor",
          drawerIcon: () => (
            <MaterialCommunityIcons name="target" size={16} color="#007B85" />
          ),
        }}
      />
      <Drawer.Screen
        name="Reinforce"
        component={Reinforce}
        options={{
          title: "Reinforce",
          drawerIcon: () => (
            <IconFeather name="refresh-ccw" size={14} color="#007B85" />
          ),
        }}
      />
      <Drawer.Screen
        name="etrSubmit"
        component={etrSubmit}
        options={{
          title: "etrSubmit",
          display: "none",
        }}
      />
      <Drawer.Screen
        name="etrReach"
        component={etrReach}
        options={{
          title: "etrReach",
          display: "none",
        }}
      />
    </Drawer.Navigator>
  );
}
