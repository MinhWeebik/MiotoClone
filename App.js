import "react-native-gesture-handler";
import React, { createContext, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";

import MainMenu from "./components/MainMenu/MainMenu";
import Notification from "./components/Notification/Main";
import Profile from "./components/Profile/Main";
import Support from "./components/Support/Main";
import Journy from "./components/Journy/Main";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyDateOne from "./components/MainMenu/SelectDateOne";
import MySelectCurrentLocation from "./components/MainMenu/SelectCurrentLocation";
import StartProvider from "./components/MainMenu/StartProvider";
import EndProvider from "./components/MainMenu/EndProvider";
import CarDetail from "./components/MainMenu/CarDetail";
import DriverTypeProvider from "./components/MainMenu/DriverTypeProvider";
import LocationProvider from "./components/MainMenu/LocationProvider";
import ArriveLocationProvider from "./components/MainMenu/ArriveLocationProvider";
import SearchForCar from "./components/MainMenu/SearchForCar";
import SpecificLocationProvider from "./components/MainMenu/SpecificLocationProvider";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const MyApp = ({ navigation }) => {
  return (
    <Tab.Navigator
      shifting={true}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "rgba(95,207,133,255)",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: styles.navigationLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          let rn = route.name;

          if (rn === "TRANG CHỦ") {
            icon = <Ionicons name="home-outline" size={20} color={color} />;
          } else if (rn === "THÔNG BÁO") {
            icon = <Feather name="bell" size={20} color={color} />;
          } else if (rn === "CHUYẾN ĐI") {
            icon = (
              <Ionicons name="car-sport-outline" size={20} color={color} />
            );
          } else if (rn === "HỖ TRỢ") {
            icon = (
              <Ionicons
                name="ios-chatbubbles-outline"
                size={20}
                color={color}
              />
            );
          } else if (rn === "CÁ NHÂN") {
            icon = (
              <Ionicons name="person-circle-outline" size={20} color={color} />
            );
          }
          return icon;
        },
      })}
    >
      <Tab.Screen name={"TRANG CHỦ"} component={MainMenu} />
      <Tab.Screen name={"THÔNG BÁO"} component={Notification} />
      <Tab.Screen name={"CHUYẾN ĐI"} component={Journy} />
      <Tab.Screen name={"HỖ TRỢ"} component={Support} />
      <Tab.Screen name={"CÁ NHÂN"} component={Profile} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <SpecificLocationProvider>
        <ArriveLocationProvider>
          <LocationProvider>
            <StartProvider>
              <EndProvider>
                <DriverTypeProvider>
                  <Stack.Navigator
                    screenOptions={{
                      headerShown: false,
                      safeAreaInsets: { top: 0 },
                    }}
                  >
                    <Stack.Screen name="Main" component={MyApp} />
                    <Stack.Screen name="SelectDateOne" component={MyDateOne} />
                    <Stack.Screen
                      name="SelectLocationNoDriver"
                      component={MySelectCurrentLocation}
                    />
                    <Stack.Screen name="CarDetail" component={CarDetail} />
                    <Stack.Screen
                      name="SearchForCar"
                      component={SearchForCar}
                    />
                  </Stack.Navigator>
                </DriverTypeProvider>
              </EndProvider>
            </StartProvider>
          </LocationProvider>
        </ArriveLocationProvider>
      </SpecificLocationProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navigationLabel: {
    fontSize: 8,
    fontWeight: "400",
    marginBottom: 10,
    paddingBottom: 7,
  },

  tabBar: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: 70,
    position: "absolute",
  },
});

export default App;
