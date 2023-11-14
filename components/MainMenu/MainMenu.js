import React, { useContext, useMemo } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Profile from "./Profile";
import Sale from "./Sale";
import NoDriverCarRecommnedation from "./NoDriverCarRecommendation";
import PopularLocation from "./PopularLocation";
import AirPort from "./AirPort";
import SelectLocation from "./SelectLocation";
import StrongPoint from "./StrongPoint";
import Protected from "./Protected";
import { useRoute } from "@react-navigation/native";
import DriverTypeProvider from "./DriverTypeProvider";
import StartProvider from "./StartProvider";

const windowWidth = Dimensions.get("window").width;

const MainMenu = ({ navigation }) => {
  const top = useMemo(() => {
    return (
      <View>
        <View style={styles.background}></View>
        <Profile navigation={navigation} />
        <View style={{ alignItems: "flex-end" }}>
          <Image
            source={require("../Images/HeaderImage.jpg")}
            style={styles.headerImageStyle}
          />
        </View>
        <View style={styles.inputInfoContainer}>
          <SelectLocation navigation={navigation} />
        </View>
        <Sale />
      </View>
    );
  });

  const bottom = useMemo(() => {
    return (
      <View>
        <PopularLocation />
        <AirPort />
        <StrongPoint />
        <Protected />
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        {top}
        <NoDriverCarRecommnedation navigation={navigation} />
        {bottom}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  background: {
    backgroundColor: "rgba(223,245,232,255)",
    height: 240 + StatusBar.currentHeight,
    width: windowWidth,
    position: "absolute",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  inputInfoContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    marginLeft: 15,
    width: windowWidth - 30,
    borderRadius: 14,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },

  headerImageStyle: {
    height: 80,
    objectFit: "contain",
  },
});

export default MainMenu;
